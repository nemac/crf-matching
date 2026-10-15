/**
 * Module: Review Store
 *
 * Reads and writes review rows in the review DynamoDB table.
 * A row tracks one organization's pending update:
 * - status: pending review -> under review -> approved | denied
 * - changes: { field: { before, after } } submitted by the practitioner
 * - reviewToken: the reviewer's token (30-day expiration)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import crypto from 'crypto';

// Initialize AWS clients
const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const dynamoClient = new DynamoDBClient({ region: 'us-east-1', ...localEndpoint });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

/**
 * Generate cryptographically secure random token
 */
export function generateReviewToken() {
  // 32 random bytes (256 bits), encoded as base64url (URL-safe, no padding)
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Normalize a value so equivalent values compare equal
 * (trimmed strings, arrays in any order)
 */
function normalizeForComparison(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map(normalizeForComparison).sort());
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return JSON.stringify(value);
}

/**
 * Compare two values after normalization
 */
function valuesEqual(a, b) {
  return normalizeForComparison(a) === normalizeForComparison(b);
}

/**
 * Merge a new submission into the changes already stored for review
 */
function mergeChanges(existingChanges, newChanges) {
  const merged = { ...existingChanges };

  for (const [field, diff] of Object.entries(newChanges)) {
    // Keep the original "before" value and take the latest "after" value
    const before = field in merged ? merged[field].before : diff.before;
    merged[field] = { before, after: diff.after };
  }

  // Drop fields the practitioner changed back to their original value
  for (const field of Object.keys(newChanges)) {
    if (valuesEqual(merged[field].before, merged[field].after)) {
      delete merged[field];
    }
  }

  return merged;
}

/**
 * Get the review row for an organization record (or null)
 */
export async function getReviewByRecordId(recordId) {
  const params = {
    TableName: process.env.REVIEW_TABLE,
    Key: {
      recordId,
    },
  };

  const result = await docClient.send(new GetCommand(params));
  return result.Item || null;
}

/**
 * Get the review row for a review token (or null) using the reviewToken index
 */
export async function getReviewByToken(reviewToken) {
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

/**
 * Create (or overwrite) a review row in pending review status with a new review token
 */
export async function putFreshReviewRow({ recordId, email, orgName, changes }) {
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

/**
 * Merge new changes into an existing pending row and extend the token expiration
 */
export async function mergeReviewRow(existingRow, newChanges) {
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

/**
 * Move a row from pending review to under review
 */
export async function setUnderReview(recordId) {
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
    // Row was not pending review (already under review or resolved), nothing to do
    if (error.name !== 'ConditionalCheckFailedException') {
      throw error;
    }
  }
}

/**
 * Mark a row approved or denied and set it to expire in DynamoDB after 30 days
 */
export async function setResolvedStatus(recordId, status) {
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

/**
 * Replace a row's review token with a new one (the old token stops working)
 */
export async function renewReviewToken(recordId) {
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
