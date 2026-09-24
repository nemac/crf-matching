import http from 'http';
import { loadOrganizationRecords } from './lib/organization-csv.mjs';

const PORT = process.env.MOCK_AIRTABLE_PORT || 4567;

const records = await loadOrganizationRecords();

const recordsById = new Map();

const recordsByEmail = new Map();

for (const record of records) {
  recordsById.set(record.id, record);
}

for (const record of records) {
  const email = record.fields.org_contact_email.toLowerCase();
  if (recordsByEmail.has(email)) {
    const exists = recordsByEmail.get(email);
    exists.push(record);
  } else {
    recordsByEmail.set(email, [record]);
  }
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function notFound(res) {
  sendJson(res, 404, {
    error: { type: 'NOT_FOUND', message: 'Record not found' },
  });
}

function handleGetById(res, recordId) {
  const record = recordsById.get(recordId);

  if (!record) {
    notFound(res);
    return;
  }

  sendJson(res, 200, record);
}

function extractEmailFromFormula(filterByFormula) {
  if (!filterByFormula) {
    return null;
  }

  const match = filterByFormula.match(/\{org_contact_email\}\s*=\s*'([^']*)'/);
  return match ? match[1].toLowerCase() : null;
}

function handleListByEmail(res, searchParams) {
  const email = extractEmailFromFormula(searchParams.get('filterByFormula'));
  const matches = email ? recordsByEmail.get(email) || [] : [];
  sendJson(res, 200, { records: matches });
}

async function readRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString();
}

async function handlePatchById(req, res, recordId) {
  const record = recordsById.get(recordId);

  if (!record) {
    notFound(res);
    return;
  }

  const rawBody = await readRequestBody(req);
  const body = rawBody ? JSON.parse(rawBody) : {};
  Object.assign(record.fields, body.fields ?? {});

  sendJson(res, 200, record);
}

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  const url = new URL(req.url, 'http://localhost');
  const segments = url.pathname.split('/').filter(Boolean);
  const [, , table, recordId] = segments;

  if (table !== 'Organization-ForDevWork') {
    notFound(res);
    return;
  }

  if (req.method === 'GET' && recordId) {
    handleGetById(res, recordId);
    return;
  }

  if (req.method === 'GET' && !recordId) {
    handleListByEmail(res, url.searchParams);
    return;
  }

  if (req.method === 'PATCH' && recordId) {
    await handlePatchById(req, res, recordId);
    return;
  }

  notFound(res);
});

server.listen(PORT, () => {
  console.log(`server listing on ${PORT}`);
});
