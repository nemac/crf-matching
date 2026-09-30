import { validateMagicLinkToken } from './magicLink.js';
import {
  getReviewByRecordId,
  getReviewByToken,
  putFreshReviewRow,
  mergeReviewRow,
  setUnderReview,
  setResolvedStatus,
  renewReviewToken,
  generateReviewToken,
} from './reviewStore.js';
import {
  getAirtableCredentials,
  fetchDevRecord,
  mapAirtableRecordToFormFields,
  mapDevRecordToProductionFields,
  patchProductionRecord,
} from './airtable.js';
import { buildReviewLink, sendReviewNotificationEmail } from './email.js';

const UNDER_REVIEW_MESSAGE =
  'The reviewer has begun reviewing your submission and it can no longer be updated. You will be able to make changes once it has been approved or denied.';

async function handleCreate(body, headers) {
  const { token, changes } = body;

  if (!token || !changes || typeof changes !== 'object' || Array.isArray(changes)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Token and changes are required',
      }),
    };
  }

  const validation = await validateMagicLinkToken(token);

  if (!validation.valid) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        success: false,
        error: validation.reason,
        expired: validation.reason === 'Token has expired',
      }),
    };
  }

  const { recordId, email } = validation;
  const existingRow = await getReviewByRecordId(recordId);

  if (existingRow && existingRow.status === 'under review') {
    return {
      statusCode: 409,
      headers,
      body: JSON.stringify({
        success: false,
        underReview: true,
        error: UNDER_REVIEW_MESSAGE,
      }),
    };
  }

  if (existingRow && existingRow.status === 'pending review') {
    await mergeReviewRow(existingRow, changes);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, merged: true }),
    };
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = await getAirtableCredentials();
  const devRecord = await fetchDevRecord(recordId, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
  const orgName = devRecord.fields?.org_name || '';

  const row = await putFreshReviewRow({ recordId, email, orgName, changes });

  try {
    await sendReviewNotificationEmail({
      orgName,
      contactEmail: email,
      changedFieldCount: Object.keys(changes).length,
      reviewLink: buildReviewLink(row.reviewToken),
    });
  } catch (error) {
    console.error('Failed to send review notification email:', error);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        success: false,
        emailSent: false,
        error: 'Review row saved, but the notification email failed to send',
      }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true }),
  };
}

async function handleGetReview(event, headers) {
  const reviewToken = event.queryStringParameters?.token;

  if (!reviewToken) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  const row = await getReviewByToken(reviewToken);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  if (row.status === 'approved' || row.status === 'denied') {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        updatedAt: row.updatedAt,
      }),
    };
  }

  const now = Math.floor(Date.now() / 1000);
  if (row.reviewTokenExpiresAt < now) {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        expired: true,
        orgName: row.orgName,
      }),
    };
  }

  if (row.status === 'pending review') {
    await setUnderReview(row.recordId);
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = await getAirtableCredentials();
  const devRecord = await fetchDevRecord(row.recordId, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
  const record = mapAirtableRecordToFormFields(devRecord);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      status: 'under review',
      orgName: row.orgName,
      email: row.email,
      changes: row.changes,
      record,
    }),
  };
}

async function handleRenew(body, headers) {
  const { token } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  const row = await getReviewByToken(token);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  if (row.status === 'approved' || row.status === 'denied') {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        updatedAt: row.updatedAt,
      }),
    };
  }

  const { reviewToken } = await renewReviewToken(row.recordId);

  await sendReviewNotificationEmail({
    orgName: row.orgName,
    contactEmail: row.email,
    changedFieldCount: Object.keys(row.changes || {}).length,
    reviewLink: buildReviewLink(reviewToken),
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true }),
  };
}

async function handleApprove(body, headers) {
  const { token } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  const row = await getReviewByToken(token);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  if (row.status === 'approved' || row.status === 'denied') {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        updatedAt: row.updatedAt,
      }),
    };
  }

  const now = Math.floor(Date.now() / 1000);
  if (row.reviewTokenExpiresAt < now) {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        expired: true,
        orgName: row.orgName,
      }),
    };
  }

  let productionUpdated = false;

  if (process.env.PRODUCTION_TABLE_NAME) {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = await getAirtableCredentials();
    const devRecord = await fetchDevRecord(row.recordId, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
    const prodRecordId = devRecord.fields?.org_production_record?.[0];

    if (!prodRecordId) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'No linked production record for this organization',
        }),
      };
    }

    try {
      await patchProductionRecord(
        prodRecordId,
        mapDevRecordToProductionFields(devRecord),
        AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID
      );
      productionUpdated = true;
    } catch (error) {
      console.error('Failed to update production record:', error);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Failed to update production record',
        }),
      };
    }
  } else {
    console.log('Production write disabled (PRODUCTION_TABLE_NAME not set)');
  }

  await setResolvedStatus(row.recordId, 'approved');

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      status: 'approved',
      productionUpdated,
    }),
  };
}

async function handleDeny(body, headers) {
  const { token } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  const row = await getReviewByToken(token);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  if (row.status === 'approved' || row.status === 'denied') {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        updatedAt: row.updatedAt,
      }),
    };
  }

  const now = Math.floor(Date.now() / 1000);
  if (row.reviewTokenExpiresAt < now) {
    return {
      statusCode: 410,
      headers,
      body: JSON.stringify({
        success: false,
        status: row.status,
        expired: true,
        orgName: row.orgName,
      }),
    };
  }

  await setResolvedStatus(row.recordId, 'denied');

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ success: true, status: 'denied' }),
  };
}

export const handler = async event => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const headers = {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  const httpMethod = event.requestContext?.http?.method || event.httpMethod;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (httpMethod === 'GET') {
      return await handleGetReview(event, headers);
    }

    if (httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');

      switch (body.action) {
        case 'create':
          return await handleCreate(body, headers);
        case 'renew':
          return await handleRenew(body, headers);
        case 'approve':
          return await handleApprove(body, headers);
        case 'deny':
          return await handleDeny(body, headers);
        case 'generateReviewToken':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              reviewToken: generateReviewToken(),
            }),
          };
        default:
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              success: false,
              error: 'Invalid or missing action',
            }),
          };
      }
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Invalid method',
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: error.message,
      }),
    };
  }
};
