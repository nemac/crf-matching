/**
 * Module: Airtable Access
 *
 * This module:
 * 1. Fetches Airtable credentials from Secrets Manager
 * 2. Fetches a record from the dev table
 * 3. Translates field names between Airtable and the form
 * 4. Patches the matching production record with approved fields
 */

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { practitionerFieldMap } from './config.js';

// Initialize AWS clients
const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const AIRTABLE_API_BASE_URL = process.env.AIRTABLE_API_URL || 'https://api.airtable.com';

const secretsClient = new SecretsManagerClient({ region: 'us-east-1', ...localEndpoint });

// Cache for Airtable credentials (reduces Secrets Manager API calls)
let cachedSecrets = null;

/**
 * Fetch Airtable credentials from Secrets Manager
 */
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

/**
 * Fetch organization record from the dev table by record ID
 */
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

// Form field names that invertFieldMap would otherwise resolve to the wrong form field
const FIELD_MAP_OVERRIDES = {
  org_name: 'org',
  org_adaptation_staff: 'organizationSize',
};

/**
 * Invert a form-field -> Airtable-field map into Airtable-field -> form-field
 */
function invertFieldMap(fieldMap) {
  const inverse = {};

  for (const [formField, airtableField] of Object.entries(fieldMap)) {
    // Keep the first form field when several share an Airtable field
    if (!(airtableField in inverse)) {
      inverse[airtableField] = formField;
    }
  }

  return { ...inverse, ...FIELD_MAP_OVERRIDES };
}

const REVERSE_FIELD_MAP = invertFieldMap(practitionerFieldMap);

/**
 * Convert an Airtable record's fields into form field names
 */
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

/**
 * Keep only known Airtable fields from a dev record so nothing unexpected
 * is written to production
 */
export function mapDevRecordToProductionFields(devRecord) {
  const fields = {};

  for (const [airtableField, value] of Object.entries(devRecord.fields || {})) {
    if (KNOWN_AIRTABLE_FIELDS.has(airtableField)) {
      fields[airtableField] = value;
    }
  }

  return fields;
}

/**
 * Update only the given fields on a production record (PATCH leaves other fields alone)
 */
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
