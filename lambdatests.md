# Lambda tests

How to run the three matching lambdas (generate-magic-link, matching-validate-token, matching-update-organization) locally against LocalStack, without touching real AWS or real Airtable credentials.

## What you need

- Docker running
- `npm install` run at the repo root
- Each lambda's own dependencies installed once with:

```
node node-scripts/install-lambda-deps.js
```

- A `.env` file at the repo root with these keys set:

```
AWS_ENDPOINT_URL=http://localhost:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
SECRET_ARN=crf-matching/airtable
DYNAMODB_TABLE=crf-matching-magic-links
SES_SENDER_EMAIL=test@example.com
FRONTEND_URL=http://localhost:5173
AIRTABLE_API_URL=http://localhost:4567
```

- `Organization-Grid view.csv` present at the repo root (a real Airtable export, gitignored, not something you commit)

## Start LocalStack

```
docker compose up -d
```

Check it came up healthy:

```
docker compose ps
```

## First time setup, or after wiping local state

LocalStack starts empty. If the DynamoDB table or the Airtable secret do not exist yet (brand new machine, or you deleted the `.localstack` folder), create them once with the AWS CLI

```
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1

aws --endpoint-url http://localhost:4566 dynamodb create-table \
  --table-name crf-matching-magic-links \
  --attribute-definitions AttributeName=token,AttributeType=S \
  --key-schema AttributeName=token,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

aws --endpoint-url http://localhost:4566 secretsmanager create-secret \
  --name crf-matching/airtable \
  --secret-string '{"AIRTABLE_API_KEY":"test-key","AIRTABLE_BASE_ID":"test-base","AIRTABLE_TABLE_ID":"test-table"}'

aws --endpoint-url http://localhost:4566 ses verify-email-identity \
  --email-address test@example.com
```

The SES step is required too. LocalStack rejects sends from an unverified address the same way real SES does, so generate-magic-link will fail with a 500 until this identity is verified.

You can confirm this worked with:

```
aws --endpoint-url http://localhost:4566 dynamodb list-tables
aws --endpoint-url http://localhost:4566 secretsmanager list-secrets
aws --endpoint-url http://localhost:4566 ses list-identities
```


## Start the mock Airtable server

In its own terminal, separate from LocalStack:

```
node scripts/mock-airtable-server.mjs
```

It loads `Organization-Grid view.csv` and serves it on port 4567 (or `MOCK_AIRTABLE_PORT` if set), standing in for the real Airtable API. It logs how many records it loaded on startup, and logs each request while it runs. Leave it running, both scripts below need it up.

## Run the fake data script

```
node scripts/invoke-local-lambda.mjs generate-magic-link
node scripts/invoke-local-lambda.mjs matching-validate-token
node scripts/invoke-local-lambda.mjs matching-update-organization
```

Each one calls the real lambda handler locally with a fake email or fake token.

These are expected to fail, and that is the correct result. It proves the AWS side and the mock Airtable side both work, but the fake test data does not exist in either, so a 401 or 404 in the output means the local wiring is working correctly, not that something is broken.

## Run the happy path script

```
node scripts/invoke-local-lambda-success.mjs
```

This picks a real record from the CSV and runs it through generate-magic-link, then looks up the token it created in DynamoDB, then runs matching-validate-token and matching-update-organization with that real token. All four steps are expected to pass. It prints a PASS or FAIL line per step and a final summary line, and exits 0 on success or 1 on failure.

## Stopping

```
docker compose down
```

This stops the container but keeps its saved data in `.localstack`. To fully reset and start clean, stop the container and delete the `.localstack` folder, then repeat the first time setup steps above.
