import fs from 'fs';
import process from 'process';
import { ArcGISIdentityManager } from '@esri/arcgis-rest-request';
import { getApiKey, slotForKey, updateApiKey } from '@esri/arcgis-rest-developer-credentials';

const DEFAULT_ITEM_ID = '0b7c5f31507d45c596ab9be036d00808';
const DEFAULT_PORTAL_URL = 'https://unca.maps.arcgis.com/sharing/rest';
const DEFAULT_PRIVILEGES = [
  'portal:apikey:basemapstyles',
  'premium:user:geocode:temporary',
];
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
const NEW_KEY_LIFESPAN_DAYS = 364;

function writeStdoutLine(message) {
  process.stdout.write(`${message}\n`);
}

function writeGitHubOutput(key, value) {
  const { GITHUB_OUTPUT: outputPath } = process.env;
  if (!outputPath) {
    return;
  }
  fs.appendFileSync(outputPath, `${key}=${value}\n`, 'utf8');
}

function toTimestampMs(value) {
  if (!value) {
    return null;
  }
  if (value instanceof Date) {
    const time = value.getTime();
    return time > 0 ? time : null;
  }
  if (typeof value === 'number' && value > 0) {
    return value;
  }
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) || parsed <= 0 ? null : parsed;
}

function getSlotExpirationMs(apiKeyInfo, rawItem, slotNumber) {
  const fieldName = `apiToken${slotNumber}ExpirationDate`;
  return (
    toTimestampMs(apiKeyInfo?.[fieldName]) ??
    toTimestampMs(apiKeyInfo?.item?.[fieldName]) ??
    toTimestampMs(rawItem?.[fieldName])
  );
}

function detectActiveSlot(currentApiKey, apiKeyInfo, rawItem) {
  if (currentApiKey) {
    try {
      const detected = String(slotForKey(currentApiKey));
      if (detected === '1') {
        return 1;
      }
      if (detected === '2') {
        return 2;
      }
    } catch {
      if (currentApiKey.includes('.AT1_')) {
        return 1;
      }
      if (currentApiKey.includes('.AT2_')) {
        return 2;
      }
    }
    if (currentApiKey.includes('.AT1_')) {
      return 1;
    }
    if (currentApiKey.includes('.AT2_')) {
      return 2;
    }
  }

  const slot1Expiration = getSlotExpirationMs(apiKeyInfo, rawItem, 1) ?? -1;
  const slot2Expiration = getSlotExpirationMs(apiKeyInfo, rawItem, 2) ?? -1;
  return slot2Expiration >= slot1Expiration ? 2 : 1;
}

async function fetchRawPortalItem(portalUrl, itemId, token) {
  const params = new URLSearchParams({ f: 'json', token });
  const response = await fetch(`${portalUrl}/content/items/${itemId}?${params}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

async function main() {
  const {
    AGOL_USERNAME: username,
    AGOL_PASSWORD: password,
    AGOL_API_KEY: rawCurrentApiKey,
    AGOL_ITEM_ID: rawItemId,
    AGOL_PORTAL_URL: rawPortalUrl,
    FORCE_ROTATE: rawForceRotate,
  } = process.env;

  const currentApiKey = rawCurrentApiKey || '';
  const itemId = rawItemId || DEFAULT_ITEM_ID;
  const portalUrl = rawPortalUrl || DEFAULT_PORTAL_URL;
  const forceRotate = rawForceRotate === 'true';

  if (!username || !password) {
    console.error('Missing required environment variables: AGOL_USERNAME and/or AGOL_PASSWORD');
    process.exit(1);
  }

  const authentication = await ArcGISIdentityManager.signIn({
    username,
    password,
    portal: portalUrl,
  });

  const [apiKeyInfo, rawItem] = await Promise.all([
    getApiKey({ itemId, authentication }),
    fetchRawPortalItem(portalUrl, itemId, authentication.token),
  ]);

  const activeSlot = detectActiveSlot(currentApiKey, apiKeyInfo, rawItem);
  const activeSlotExpirationMs = getSlotExpirationMs(apiKeyInfo, rawItem, activeSlot);
  const nowMs = Date.now();
  const remainingMs = activeSlotExpirationMs !== null ? activeSlotExpirationMs - nowMs : -1;
  const remainingDays = (remainingMs / (24 * 60 * 60 * 1000)).toFixed(1);

  if (!forceRotate && activeSlotExpirationMs !== null && remainingMs > TWO_WEEKS_MS) {
    writeStdoutLine(
      `Active API key (slot ${activeSlot}) expires on ${new Date(activeSlotExpirationMs).toISOString()} (${remainingDays} days remaining). Renewal threshold is 14 days. Skipping rotation.`
    );
    writeGitHubOutput('rotated', 'false');
    return;
  }

  const targetSlot = activeSlot === 1 ? 2 : 1;
  const newExpirationDate = new Date(nowMs + NEW_KEY_LIFESPAN_DAYS * 24 * 60 * 60 * 1000);
  const privileges =
    Array.isArray(apiKeyInfo?.privileges) && apiKeyInfo.privileges.length > 0
      ? apiKeyInfo.privileges
      : DEFAULT_PRIVILEGES;
  const httpReferrers = Array.isArray(apiKeyInfo?.httpReferrers) ? apiKeyInfo.httpReferrers : [];

  writeStdoutLine(
    `Rotating AGOL API key from slot ${activeSlot} to slot ${targetSlot} with new expiration ${newExpirationDate.toISOString()}...`
  );

  const updateOptions = {
    itemId,
    authentication,
    privileges,
    httpReferrers,
    ...(targetSlot === 1
      ? { generateToken1: true, apiToken1ExpirationDate: newExpirationDate }
      : { generateToken2: true, apiToken2ExpirationDate: newExpirationDate }),
  };

  const updatedKeyResponse = await updateApiKey(updateOptions);
  const newApiKey =
    targetSlot === 1 ? updatedKeyResponse.accessToken1 : updatedKeyResponse.accessToken2;

  if (!newApiKey) {
    console.error(`Failed to retrieve newly generated token from slot ${targetSlot}.`);
    process.exit(1);
  }

  writeStdoutLine(`::add-mask::${newApiKey}`);
  writeStdoutLine(`Successfully generated new API key in slot ${targetSlot}.`);

  writeGitHubOutput('rotated', 'true');
  writeGitHubOutput('new_api_key', newApiKey);
  writeGitHubOutput('slot', String(targetSlot));
  writeGitHubOutput('expires_at', newExpirationDate.toISOString());
}

main().catch((error) => {
  console.error('Failed to check or rotate AGOL API key:', error);
  process.exit(1);
});
