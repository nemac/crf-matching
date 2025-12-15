/**
 * Lambda Function: Generate Magic Link
 *
 * This function:
 * 1. Receives an email address
 * 2. Queries Airtable to find the organization record
 * 3. Generates a cryptographically secure token
 * 4. Stores the token in DynamoDB with 24-hour expiration
 * 5. Sends an email with the magic link
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import crypto from 'crypto';

// Initialize AWS clients
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({ region: 'us-east-1' });
const secretsClient = new SecretsManagerClient({ region: 'us-east-1' });

// Cache for Airtable credentials (reduces Secrets Manager API calls)
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
 * Query Airtable to find organization by email
 */
async function findOrganizationByEmail(email, apiKey, baseId) {
  const url = `https://api.airtable.com/v0/${baseId}/Organization-ForDevWork`;

  // Airtable filter formula to find record by email
  const filterFormula = `{org_contact_email} = '${email}'`;

  const response = await fetch(`${url}?filterByFormula=${encodeURIComponent(filterFormula)}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.records || data.records.length === 0) {
    return null;
  }

  return data.records[0]; // Return first matching record
}

/**
 * Generate cryptographically secure random token
 */
function generateSecureToken() {
  // Generate 32 random bytes (256 bits) for high security
  const buffer = crypto.randomBytes(32);
  // Encode as base64url (URL-safe, no padding)
  return buffer.toString('base64url');
}

/**
 * Store token in DynamoDB
 */
async function storeToken(token, email, recordId) {
  const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
  const expiresAt = now + 86400; // 24 hours from now

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      token: token,
      email: email,
      recordId: recordId,
      createdAt: now,
      ttl: expiresAt, // DynamoDB will auto-delete after this time
    },
  };

  await docClient.send(new PutCommand(params));
  return expiresAt;
}

/**
 * Send email with magic link using SES
 */
async function sendMagicLinkEmail(recipientEmail, magicLink, organizationName) {
  const params = {
    Source: process.env.SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Subject: {
        Data: 'Update Your Organization Information',
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
                .warning { color: #d9534f; font-size: 14px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Climate Resilience Funders</h1>
                </div>
                <div class="content">
                  <h2>Update Your Organization Information</h2>
                  <p>Hello${organizationName ? ` ${organizationName}` : ''},</p>
                  <p>You requested to update your organization's information in the Adaptation Registry.</p>
                  <p>Click the button below to access the update form:</p>
                  <p style="text-align: center;">
                    <a href="${magicLink}" class="button">Update My Information</a>
                  </p>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; background: white; padding: 10px; border: 1px solid #ddd;">
                    ${magicLink}
                  </p>
                  <p class="warning">
                    ⚠️ This link will expire in 24 hours for security reasons.<br>
                    Do not share this link with anyone else.
                  </p>
                </div>
                <div class="footer">
                  <p>Climate Resilience Funders - Adaptation Registry</p>
                  <p>If you didn't request this link, please ignore this email.</p>
                </div>
              </div>
            </body>
            </html>
          `,
          Charset: 'UTF-8',
        },
        Text: {
          Data: `
Update Your Organization Information

Hello${organizationName ? ` from ${organizationName}` : ''},

You requested to update your organization's information in the Adaptation Registry.

Click this link to access the update form:
${magicLink}

⚠️ This link will expire in 24 hours for security reasons.
Do not share this link with anyone else.

---
Climate Resilience Funders - Adaptation Registry
If you didn't request this link, please ignore this email.
          `,
          Charset: 'UTF-8',
        },
      },
    },
  };

  await sesClient.send(new SendEmailCommand(params));
}

/**
 * Lambda handler
 */
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { email } = body;

    // Validate input
    if (!email || typeof email !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Email address is required',
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid email format',
        }),
      };
    }

    // Get Airtable credentials
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = await getAirtableCredentials();

    // Find organization in Airtable
    console.log('Searching for organization with email:', email);
    const organization = await findOrganizationByEmail(email, AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID);

    if (!organization) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'No organization found with this email address',
        }),
      };
    }

    console.log('Found organization:', organization.id);

    // Generate secure token
    const token = generateSecureToken();
    console.log('Generated token (first 10 chars):', token.substring(0, 10) + '...');

    // Store token in DynamoDB
    await storeToken(token, email, organization.id);
    console.log('Token stored in DynamoDB');

    // Generate magic link
    const magicLink = `${process.env.FRONTEND_URL}/update-data?token=${token}`;

    // Send email with magic link
    const organizationName = organization.fields.org_name || '';
    await sendMagicLinkEmail(email, magicLink, organizationName);
    console.log('Email sent successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Magic link sent to your email',
        // Don't expose the token in production, but useful for debugging
        // token: token,
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
