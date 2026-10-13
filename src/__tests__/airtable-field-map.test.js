import { describe, it, expect } from 'vitest';
import { loadEnv } from 'vite';
import { practitionerFieldMap } from '../config/config.js';

const env = loadEnv('test', process.cwd(), '');
const token = env.AIRTABLE_TOKEN;
const baseId = env.AIRTABLE_BASE;
const hasCredentials = Boolean(token && baseId);

const PRACTITIONER_TABLE = 'Organization';

const buildRecordsUrl = fieldNames => {
  const params = new URLSearchParams({ maxRecords: '1' });
  fieldNames.forEach(fieldName => params.append('fields[]', fieldName));
  return `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
    PRACTITIONER_TABLE
  )}?${params.toString()}`;
};

const fetchWithFields = async fieldNames => {
  const response = await fetch(buildRecordsUrl(fieldNames), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await response.json();
  return { status: response.status, body };
};

describe.skipIf(!hasCredentials)(
  'practitionerFieldMap matches the Airtable Organization table',
  () => {
    const mappedFieldNames = [...new Set(Object.values(practitionerFieldMap))];

    it('can reach the Organization table', async () => {
      const { status, body } = await fetchWithFields([]);
      expect(status, JSON.stringify(body.error)).toBe(200);
    });

    it('has every mapped field in the Organization table', async () => {
      const { status, body } = await fetchWithFields(mappedFieldNames);
      const errorMessage = body.error?.message ?? JSON.stringify(body.error);
      expect(status, `Airtable rejected mapped fields: ${errorMessage}`).toBe(
        200
      );
    });
  },
  30000
);
