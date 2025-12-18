/**
 * Lambda Function: Validate Token and Fetch Airtable Data
 *
 * This function:
 * 1. Receives a token from the query string
 * 2. Validates the token exists and hasn't expired in DynamoDB
 * 3. Fetches the full organization data from Airtable
 * 4. Returns the data to prefill the form
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { practitionerFieldMap } from './config.js';

// Initialize AWS clients
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const secretsClient = new SecretsManagerClient({ region: 'us-east-1' });

// Cache for Airtable credentials
let cachedSecrets = null;

/**
 * Fetch Airtable credentials from Secrets Manager
 */
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

/**
 * Validate token in DynamoDB
 */
async function validateToken(token) {
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

/**
 * Fetch organization data from Airtable by record ID
 */
async function fetchOrganizationData(recordId, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Organization-ForDevWork/${recordId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Airtable API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
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
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS preflight request for Lambda Function URLs
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;

  // Handle OPTIONS preflight request
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Extract token from query string
    const token = event.queryStringParameters?.token;

    if (!token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Token is required',
        }),
      };
    }

    console.log(
      'Validating token (first 10 chars):',
      `${token.substring(0, 10)}...`
    );

    // Validate token in DynamoDB
    const validation = await validateToken(token);

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

    console.log('Token valid. Record ID:', validation.recordId);

    // Get Airtable credentials
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } =
      await getAirtableCredentials();

    // Fetch organization data from Airtable
    const organization = await fetchOrganizationData(
      validation.recordId,
      AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID
    );

    console.log('Organization data fetched successfully');

    const frontendData = { recordId: organization.id };

    for (const [frontendField, airtableField] of Object.entries(
      practitionerFieldMap
    )) {
      if (organization.fields[airtableField] !== undefined) {
        frontendData[frontendField] = organization.fields[airtableField];
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: frontendData,
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
