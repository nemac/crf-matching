/**
 * Lambda Function: Review Update Organization
 *
 * This function:
 * 1. Receives a practitioner's submitted changes (create) and stores them for review
 * 2. Emails the reviewer a link with a review token
 * 3. Returns the pending changes to the reviewer and marks them under review (GET)
 * 4. Lets the reviewer approve (patches production Airtable) or deny
 * 5. Issues a new review token when the old one expires (renew)
 */

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

/**
 * Store a practitioner's submitted changes and notify the reviewer
 */
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

  // Validate the practitioner's magic link token
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

  // Block new changes once the reviewer has begun reviewing
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

  // Not yet opened by the reviewer: merge into the existing review
  if (existingRow && existingRow.status === 'pending review') {
    await mergeReviewRow(existingRow, changes);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, merged: true }),
    };
  }

  // No open review: get the organization name and create a fresh review
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = await getAirtableCredentials();
  const devRecord = await fetchDevRecord(recordId, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
  const orgName = devRecord.fields?.org_name || '';

  const row = await putFreshReviewRow({ recordId, email, orgName, changes });

  // Email the reviewer (the review row is already saved if this fails)
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

/**
 * Return the pending changes to the reviewer and mark the review as under review
 */
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

  // Already resolved: the link is no longer usable
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

  // Check if the review token has expired
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

  // Opening the review locks out further practitioner changes
  if (row.status === 'pending review') {
    await setUnderReview(row.recordId);
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = await getAirtableCredentials();
  const devRecord = await fetchDevRecord(row.recordId, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
  // Convert Airtable field names to form field names for the review page
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

/**
 * Issue a new review token and email a fresh link to the reviewer
 */
async function handleRenew(body, headers) {
  const { token } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  // Look up the review by the reviewer's token
  const row = await getReviewByToken(token);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  // Already resolved: the link is no longer usable
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

  // The old token stops working once the new one is saved
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

/**
 * Approve a review: write the dev record's fields to production, then mark it approved
 */
async function handleApprove(body, headers) {
  const { token } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  // Look up the review by the reviewer's token
  const row = await getReviewByToken(token);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  // Already resolved: the link is no longer usable
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

  // Check if the review token has expired
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

  // Production writes only happen when PRODUCTION_TABLE_NAME is set
  if (process.env.PRODUCTION_TABLE_NAME) {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = await getAirtableCredentials();
    const devRecord = await fetchDevRecord(row.recordId, AIRTABLE_API_KEY, AIRTABLE_BASE_ID);
    // The dev record links to its production record
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

  // Only mark approved after production was updated (or writes are disabled)
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

/**
 * Deny a review and mark it denied
 */
async function handleDeny(body, headers) {
  const { token } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Token is required' }),
    };
  }

  // Look up the review by the reviewer's token
  const row = await getReviewByToken(token);

  if (!row) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Review not found' }),
    };
  }

  // Already resolved: the link is no longer usable
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

  // Check if the review token has expired
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

/**
 * Lambda handler
 */
export const handler = async event => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS preflight request for Lambda Function URLs
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // GET: the reviewer opens a review link
    if (httpMethod === 'GET') {
      return await handleGetReview(event, headers);
    }

    // POST: route by action
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
