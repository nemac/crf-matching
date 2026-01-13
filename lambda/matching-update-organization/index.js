/**
 * Lambda Function: Update Organization Data
 *
 * This function:
 * 1. Receives a token and updated organization data
 * 2. Validates the token
 * 3. Updates the organization record in Airtable
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { practitionerFieldMap } from './config.js';

const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const secretsClient = new SecretsManagerClient({ region: 'us-east-1' });

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
 * Update organization data in Airtable
 */
async function updateOrganizationData(recordId, updates, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Organization-ForDevWork/${recordId}`;

  const airtableFields = {};

  for (const [fieldName, fieldValue] of Object.entries(updates)) {
    if (fieldValue !== undefined && practitionerFieldMap[fieldName]) {
      airtableFields[practitionerFieldMap[fieldName]] = fieldValue;
    }
  }

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: airtableFields,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      `Airtable API error: ${response.status} ${response.statusText} - ${errorData}`
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

  const headers = {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    const body = JSON.parse(event.body || '{}');
    const { token, updates } = body;

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

    if (!updates || typeof updates !== 'object') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Updates object is required',
        }),
      };
    }

    console.log(
      'Validating token (first 10 chars):',
      `${token.substring(0, 10)}...`
    );

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

    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } =
      await getAirtableCredentials();

    const updatedOrganization = await updateOrganizationData(
      validation.recordId,
      updates,
      AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID
    );

    console.log('Organization data updated successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Organization data updated successfully',
        data: {
          recordId: updatedOrganization.id,
        },
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
