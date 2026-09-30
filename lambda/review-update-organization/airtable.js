import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { practitionerFieldMap } from './config.js';

const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const AIRTABLE_API_BASE_URL = process.env.AIRTABLE_API_URL || 'https://api.airtable.com';

const secretsClient = new SecretsManagerClient({ region: 'us-east-1', ...localEndpoint });

let cachedSecrets = null;

export async function getAirtableCredentials() {
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

export async function fetchDevRecord(recordId, apiKey, baseId) {
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

export function mapAirtableRecordToFormFields(record) {
  const formFields = {};

  for (const [airtableField, value] of Object.entries(record.fields || {})) {
    const formField = REVERSE_FIELD_MAP[airtableField];
    if (formField) {
      formFields[formField] = value;
    }
  }

  return formFields;
}

const KNOWN_AIRTABLE_FIELDS = new Set(Object.values(practitionerFieldMap));

export function mapDevRecordToProductionFields(devRecord) {
  const fields = {};

  for (const [airtableField, value] of Object.entries(devRecord.fields || {})) {
    if (KNOWN_AIRTABLE_FIELDS.has(airtableField)) {
      fields[airtableField] = value;
    }
  }

  return fields;
}

export async function patchProductionRecord(prodRecordId, fields, apiKey, baseId) {
  const url = `${AIRTABLE_API_BASE_URL}/v0/${baseId}/${process.env.PRODUCTION_TABLE_NAME}/${prodRecordId}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      `Airtable API error: ${response.status} ${response.statusText} - ${errorData}`
    );
  }

  return response.json();
}
