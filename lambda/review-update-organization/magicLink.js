/**
 * Module: Magic Link Token Validation
 *
 * Validates the practitioner's magic link token (the one emailed by
 * generate-magic-link) against the magic link DynamoDB table.
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

// Initialize AWS clients
const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const dynamoClient = new DynamoDBClient({ region: 'us-east-1', ...localEndpoint });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

/**
 * Validate token in DynamoDB
 */
export async function validateMagicLinkToken(token) {
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

  // Check if token has expired
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
