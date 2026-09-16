import dotenv from 'dotenv';
dotenv.config();

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { loadOrganizationRecords } from './lib/organization-csv.mjs';

const { handler: magicLink } = await import(
  '../lambda/generate-magic-link/index.js'
);
const { handler: validToken } = await import(
  '../lambda/matching-validate-token/index.js'
);
const { handler: updateOrg } = await import(
  '../lambda/matching-update-organization/index.js'
);

const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const dynamoClient = new DynamoDBClient({
  region: 'us-east-1',
  ...localEndpoint,
});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const steps = [];

function recordStep(name, passed, detail) {
  steps.push({ name, passed, detail });
  console.log(
    `[RESULT] ${passed ? 'PASS' : 'FAIL'} - ${name}${detail ? ` (${detail})` : ''}`
  );
}

function printSummary() {
  const allPassed = steps.every(step => step.passed);
  console.log(
    `[RESULT] ${allPassed ? 'All steps PASSED' : 'One or more steps FAILED'}`
  );
  process.exitCode = allPassed ? 0 : 1;
}

async function findLatestTokenForEmail(email) {
  const result = await docClient.send(
    new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE,
      FilterExpression: '#email = :email',
      ExpressionAttributeNames: { '#email': 'email' },
      ExpressionAttributeValues: { ':email': email },
    })
  );

  const items = result.Items || [];
  if (items.length === 0) {
    return null;
  }

  return items.reduce((latest, item) =>
    item.createdAt > latest.createdAt ? item : latest
  );
}

async function main() {
  const [fixture] = await loadOrganizationRecords();
  const testEmail = fixture.fields.org_contact_email;

  console.log(
    '[RESULT] === happy path invoker: all steps expected to SUCCEED against the mock Airtable server ==='
  );

  const magicLinkResult = await magicLink({
    body: JSON.stringify({ email: testEmail }),
  });
  const magicLinkBody = JSON.parse(magicLinkResult.body);
  recordStep(
    'generate-magic-link',
    magicLinkResult.statusCode === 200 && magicLinkBody.success === true,
    `status ${magicLinkResult.statusCode}`
  );

  const tokenItem = await findLatestTokenForEmail(testEmail);
  recordStep('find token in DynamoDB', Boolean(tokenItem));

  if (!tokenItem) {
    printSummary();
    return;
  }

  const validateResult = await validToken({
    queryStringParameters: { token: tokenItem.token },
  });
  const validateBody = JSON.parse(validateResult.body);
  recordStep(
    'matching-validate-token',
    validateResult.statusCode === 200 && validateBody.success === true,
    `status ${validateResult.statusCode}`
  );

  const updateResult = await updateOrg({
    body: JSON.stringify({
      token: tokenItem.token,
      updates: {
        org: `${fixture.fields.org_name} (updated by happy-path test)`,
      },
    }),
  });
  const updateBody = JSON.parse(updateResult.body);
  recordStep(
    'matching-update-organization',
    updateResult.statusCode === 200 && updateBody.success === true,
    `status ${updateResult.statusCode}`
  );

  printSummary();
}

await main();
