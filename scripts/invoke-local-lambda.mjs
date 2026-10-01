import dotenv from 'dotenv';
dotenv.config();
const { handler: magicLink } =
  await import('../lambda/generate-magic-link/index.js');
const { handler: validToken } =
  await import('../lambda/matching-validate-token/index.js');
const { handler: updateOrg } =
  await import('../lambda/matching-update-organization/index.js');
const { handler: reviewUpdate } =
  await import('../lambda/review-update-organization/index.js');

const target = process.argv[2];

if (target === 'generate-magic-link') {
  const fakeEvent = { body: JSON.stringify({ email: 'test@example.com' }) };
  const result = await magicLink(fakeEvent);
  console.log(result);
}

if (target === 'matching-validate-token') {
  const fakeEvent = { queryStringParameters: { token: 'test-token-123' } };
  const result = await validToken(fakeEvent);
  console.log(result);
}

if (target === 'matching-update-organization') {
  const fakeEvent = {
    body: JSON.stringify({
      token: 'test-token-123',
      updates: { org: 'Test Updated Org' },
    }),
  };
  const result = await updateOrg(fakeEvent);
  console.log(result);
}

if (target === 'review-update-organization') {
  const fakeEvent = {
    httpMethod: 'POST',
    body: JSON.stringify({ action: process.argv[3] }),
  };
  const result = await reviewUpdate(fakeEvent);
  console.log(result);
}
