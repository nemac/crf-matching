import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const CSV_FILENAME = 'Organization-Grid view.csv';
const CSV_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  CSV_FILENAME
);
const RECORD_ID_COLUMN = 'org_airtable_record_id';
const FIXED_CREATED_TIME = '2024-01-01T00:00:00.000Z';

async function readCsvBuffer() {
  try {
    return await readFile(CSV_PATH);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(
        `Could not find "${CSV_FILENAME}" at the repo root (${CSV_PATH}). Place the Airtable export there before running this script.`
      );
    }
    throw error;
  }
}

function rowToRecord(row) {
  const id = row[RECORD_ID_COLUMN];
  const fields = {};

  for (const [column, value] of Object.entries(row)) {
    if (column === RECORD_ID_COLUMN) continue;
    if (value === '') continue;
    fields[column] = value;
  }

  return { id, createdTime: FIXED_CREATED_TIME, fields };
}

export async function loadOrganizationRecords() {
  const buffer = await readCsvBuffer();
  const rows = parse(buffer, {
    columns: true,
    bom: true,
    skip_empty_lines: true,
  });

  return rows.map(rowToRecord).filter(record => record.id);
}
