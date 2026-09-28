import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import crypto from 'crypto';
import { practitionerFieldMap } from './config.js';

const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const AIRTABLE_API_BASE_URL = process.env.AIRTABLE_API_URL || 'https://api.airtable.com';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1', ...localEndpoint });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({ region: 'us-east-1', ...localEndpoint });
const secretsClient = new SecretsManagerClient({ region: 'us-east-1', ...localEndpoint });

let cachedSecrets = null;

async function getAirtableCredentials() {
  if (cachedSecrets) {
    return cachedSecrets;
  }

  const command = new GetSecretValueCommand({
    SecretId: process.env.SECRET_ARN,
  });

  const response = await secretsClient.send(command);
  cachedSecrets = JSON.parse(response.SecretString);
  return cachedSecrets;
}

async function validateMagicLinkToken(token) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      token,
    },
  };

  const result = await docClient.send(new GetCommand(params));

  if (!result.Item) {
    return { valid: false, reason: 'Token not found' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (result.Item.ttl < now) {
    return { valid: false, reason: 'Token has expired' };
  }

  return {
    valid: true,
    email: result.Item.email,
    recordId: result.Item.recordId,
  };
}

async function getReviewByRecordId(recordId) {
  const params = {
    TableName: process.env.REVIEW_TABLE,
    Key: {
      recordId,
    },
  };

  const result = await docClient.send(new GetCommand(params));
  return result.Item || null;
}

async function getReviewByToken(reviewToken) {
  const params = {
    TableName: process.env.REVIEW_TABLE,
    IndexName: 'reviewToken-index',
    KeyConditionExpression: 'reviewToken = :reviewToken',
    ExpressionAttributeValues: {
      ':reviewToken': reviewToken,
    },
  };

  const result = await docClient.send(new QueryCommand(params));
  return result.Items && result.Items.length > 0 ? result.Items[0] : null;
}

function normalizeForComparison(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map(normalizeForComparison).sort());
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return JSON.stringify(value);
}

function valuesEqual(a, b) {
  return normalizeForComparison(a) === normalizeForComparison(b);
}

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

function generateReviewToken() {
  return crypto.randomBytes(32).toString('base64url');
}

async function putFreshReviewRow({ recordId, email, orgName, changes }) {
  const now = Math.floor(Date.now() / 1000);
  const reviewToken = generateReviewToken();
  const reviewTokenExpiresAt = now + THIRTY_DAYS_SECONDS;

  const item = {
    recordId,
    reviewToken,
    reviewTokenExpiresAt,
    status: 'pending review',
    email,
    orgName,
    changes,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: process.env.REVIEW_TABLE,
      Item: item,
    })
  );

  return item;
}

async function mergeReviewRow(existingRow, newChanges) {
  const now = Math.floor(Date.now() / 1000);
  const mergedChanges = mergeChanges(existingRow.changes, newChanges);
  const reviewTokenExpiresAt = now + THIRTY_DAYS_SECONDS;

  await docClient.send(
    new UpdateCommand({
      TableName: process.env.REVIEW_TABLE,
      Key: { recordId: existingRow.recordId },
      UpdateExpression:
        'SET changes = :changes, reviewTokenExpiresAt = :reviewTokenExpiresAt, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':changes': mergedChanges,
        ':reviewTokenExpiresAt': reviewTokenExpiresAt,
        ':updatedAt': now,
      },
    })
  );

  return {
    ...existingRow,
    changes: mergedChanges,
    reviewTokenExpiresAt,
    updatedAt: now,
  };
}

async function setUnderReview(recordId) {
  const now = Math.floor(Date.now() / 1000);

  try {
    await docClient.send(
      new UpdateCommand({
        TableName: process.env.REVIEW_TABLE,
        Key: { recordId },
        UpdateExpression:
          'SET #status = :underReview, reviewStartedAt = :now, updatedAt = :now',
        ConditionExpression: '#status = :pending',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: {
          ':underReview': 'under review',
          ':pending': 'pending review',
          ':now': now,
        },
      })
    );
  } catch (error) {
    if (error.name !== 'ConditionalCheckFailedException') {
      throw error;
    }
  }
}

async function setResolvedStatus(recordId, status) {
  const now = Math.floor(Date.now() / 1000);
  const ttl = now + THIRTY_DAYS_SECONDS;

  await docClient.send(
    new UpdateCommand({
      TableName: process.env.REVIEW_TABLE,
      Key: { recordId },
      UpdateExpression: 'SET #status = :status, updatedAt = :now, #ttl = :ttl',
      ExpressionAttributeNames: { '#status': 'status', '#ttl': 'ttl' },
      ExpressionAttributeValues: {
        ':status': status,
        ':now': now,
        ':ttl': ttl,
      },
    })
  );

  return { status, updatedAt: now, ttl };
}

async function renewReviewToken(recordId) {
  const now = Math.floor(Date.now() / 1000);
  const reviewToken = generateReviewToken();
  const reviewTokenExpiresAt = now + THIRTY_DAYS_SECONDS;

  await docClient.send(
    new UpdateCommand({
      TableName: process.env.REVIEW_TABLE,
      Key: { recordId },
      UpdateExpression:
        'SET reviewToken = :reviewToken, reviewTokenExpiresAt = :reviewTokenExpiresAt, updatedAt = :now',
      ExpressionAttributeValues: {
        ':reviewToken': reviewToken,
        ':reviewTokenExpiresAt': reviewTokenExpiresAt,
        ':now': now,
      },
    })
  );

  return { reviewToken, reviewTokenExpiresAt, updatedAt: now };
}

async function fetchDevRecord(recordId, apiKey, baseId) {
  const url = `${AIRTABLE_API_BASE_URL}/v0/${baseId}/Organization-ForDevWork/${recordId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      `Airtable API error: ${response.status} ${response.statusText} - ${errorData}`
    );
  }

  return response.json();
}

const FIELD_MAP_OVERRIDES = {
  org_name: 'org',
  org_adaptation_staff: 'organizationSize',
};

function invertFieldMap(fieldMap) {
  const inverse = {};

  for (const [formField, airtableField] of Object.entries(fieldMap)) {
    if (!(airtableField in inverse)) {
      inverse[airtableField] = formField;
    }
  }

  return { ...inverse, ...FIELD_MAP_OVERRIDES };
}

const REVERSE_FIELD_MAP = invertFieldMap(practitionerFieldMap);

function mapAirtableRecordToFormFields(record) {
  const formFields = {};

  for (const [airtableField, value] of Object.entries(record.fields || {})) {
    const formField = REVERSE_FIELD_MAP[airtableField];
    if (formField) {
      formFields[formField] = value;
    }
  }

  return formFields;
}

function buildReviewLink(reviewToken) {
  return `${process.env.FRONTEND_URL}/review-update?token=${reviewToken}`;
}

async function sendReviewNotificationEmail({
  orgName,
  contactEmail,
  changedFieldCount,
  reviewLink,
}) {
  const params = {
    Source: process.env.SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [process.env.REVIEW_NOTIFICATION_EMAIL],
    },
    Message: {
      Subject: {
        Data: `Organization update ready for review: ${orgName}`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
                .content { padding: 30px 20px; background-color: #f9f9f9; }
                .button {
                  display: inline-block;
                  padding: 12px 30px;
                  background-color: #0066CC;
                  color: white !important;
                  text-decoration: none;
                  border-radius: 4px;
                  margin: 20px 0;
                }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Climate Resilience Funders</h1>
                </div>
                <div class="content">
                  <h2>Organization Update Ready for Review</h2>
                  <p><strong>Organization:</strong> ${orgName}</p>
                  <p><strong>Contact email:</strong> ${contactEmail}</p>
                  <p><strong>Fields changed:</strong> ${changedFieldCount}</p>
                  <p style="text-align: center;">
                    <a href="${reviewLink}" class="button">Review Update</a>
                  </p>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; background: white; padding: 10px; border: 1px solid #ddd;">
                    ${reviewLink}
                  </p>
                </div>
                <div class="footer">
                  <p>Climate Resilience Funders - Adaptation Registry</p>
                </div>
              </div>
            </body>
            </html>
          `,
          Charset: 'UTF-8',
        },
        Text: {
          Data: `
Organization Update Ready for Review

Organization: ${orgName}
Contact email: ${contactEmail}
Fields changed: ${changedFieldCount}

Review the update here:
${reviewLink}

---
Climate Resilience Funders - Adaptation Registry
          `,
          Charset: 'UTF-8',
        },
      },
    },
  };

  await sesClient.send(new SendEmailCommand(params));
}

function mergeChanges(existingChanges, newChanges) {
  const merged = { ...existingChanges };

  for (const [field, diff] of Object.entries(newChanges)) {
    const before = field in merged ? merged[field].before : diff.before;
    merged[field] = { before, after: diff.after };
  }

  for (const field of Object.keys(newChanges)) {
    if (valuesEqual(merged[field].before, merged[field].after)) {
      delete merged[field];
    }
  }

  return merged;
}
