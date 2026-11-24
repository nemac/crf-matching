import fs from 'fs';
import process from 'process';
import { ArcGISIdentityManager } from '@esri/arcgis-rest-request';
import { getApiKey, slotForKey, updateApiKey } from '@esri/arcgis-rest-developer-credentials';

const DEFAULT_ITEM_ID = '0b7c5f31507d45c596ab9be036d00808';
const DEFAULT_PORTAL_URL = 'https://unca.maps.arcgis.com/sharing/rest';
const RENEWAL_THRESHOLD_DAYS = 30;
const RENEWAL_THRESHOLD_MS = RENEWAL_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;
const NEW_KEY_LIFESPAN_DAYS = 364;
const MINIMUM_SAVED_LIFESPAN_MS = 300 * 24 * 60 * 60 * 1000;
const EARLIEST_PLAUSIBLE_EXPIRATION_MS = Date.UTC(2020, 0, 1);
const LATEST_PLAUSIBLE_EXPIRATION_MS = Date.now() + 400 * 24 * 60 * 60 * 1000;

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
  let timestamp = null;
  if (value instanceof Date) {
    timestamp = value.getTime();
  } else if (typeof value === 'number') {
    timestamp = value;
  } else if (typeof value === 'string' && value.trim() !== '' && Number.isNaN(Number(value))) {
    timestamp = Date.parse(value);
  }
  return timestamp > 0 ? timestamp : null;
}

function isPlausibleExpiration(timestamp) {
  if (timestamp === null) {
    return false;
  }
  return timestamp >= EARLIEST_PLAUSIBLE_EXPIRATION_MS && timestamp <= LATEST_PLAUSIBLE_EXPIRATION_MS;
}

function getSlotExpirationMs(apiKeyInfo, slotNumber) {
  const timestamp = toTimestampMs(apiKeyInfo?.item?.[`apiToken${slotNumber}ExpirationDate`]);
  return isPlausibleExpiration(timestamp) ? timestamp : null;
}

function describeExpiration(value) {
  const timestamp = toTimestampMs(value);
  if (timestamp === null) {
    return `unreadable (${JSON.stringify(value)})`;
  }
  return new Date(timestamp).toISOString();
}

function logBothSlotExpirations(apiKeyInfo) {
  for (const slotNumber of [1, 2]) {
    const fieldName = `apiToken${slotNumber}ExpirationDate`;
    const itemValue = describeExpiration(apiKeyInfo?.item?.[fieldName]);
    const appInfoValue = describeExpiration(apiKeyInfo?.[fieldName]);
    writeStdoutLine(`Slot ${slotNumber} expiration: item says ${itemValue}, app info says ${appInfoValue}`);
  }
}

function exitUnlessExpirationSaved(updatedKeyResponse, targetSlot, nowMs, newExpirationDate) {
  const savedExpirationMs = getSlotExpirationMs(updatedKeyResponse, targetSlot);
  if (savedExpirationMs !== null && savedExpirationMs - nowMs > MINIMUM_SAVED_LIFESPAN_MS) {
    return;
  }
  const savedValue = describeExpiration(updatedKeyResponse?.item?.[`apiToken${targetSlot}ExpirationDate`]);
  console.error(
    `::error::Slot ${targetSlot} expiration reads back as ${savedValue}, not about ${newExpirationDate.toISOString()}. Not saving the new key.`
  );
  process.exit(1);
}

function detectActiveSlot(currentApiKey) {
  const slot = slotForKey(currentApiKey);
  if (slot === 1 || slot === 2) {
    return slot;
  }
  return null;
}

async function main() {
  const {
    AGOL_USERNAME: username,
    AGOL_PASSWORD: password,
    AGOL_API_KEY: rawCurrentApiKey,
    AGOL_ITEM_ID: rawItemId,
    AGOL_PORTAL_URL: rawPortalUrl,
    FORCE_ROTATE: rawForceRotate,
    DRY_RUN: rawDryRun,
  } = process.env;

  const currentApiKey = rawCurrentApiKey || '';
  const itemId = rawItemId || DEFAULT_ITEM_ID;
  const portalUrl = rawPortalUrl || DEFAULT_PORTAL_URL;
  const forceRotate = rawForceRotate === 'true';
  const dryRun = rawDryRun === 'true';

  if (!username || !password) {
    console.error('Missing required environment variables: AGOL_USERNAME and/or AGOL_PASSWORD');
    process.exit(1);
  }

  if (!currentApiKey) {
    console.error('Missing required environment variable: AGOL_API_KEY');
    process.exit(1);
  }

  const activeSlot = detectActiveSlot(currentApiKey);
  if (activeSlot === null) {
    console.error('Could not tell whether AGOL_API_KEY is in slot 1 or slot 2. Refusing to rotate.');
    process.exit(1);
  }

  const authentication = await ArcGISIdentityManager.signIn({
    username,
    password,
    portal: portalUrl,
  });
  writeStdoutLine(`::add-mask::${authentication.token}`);

  const apiKeyInfo = await getApiKey({ itemId, authentication });
  logBothSlotExpirations(apiKeyInfo);

  const activeSlotExpirationMs = getSlotExpirationMs(apiKeyInfo, activeSlot);
  if (activeSlotExpirationMs === null && !forceRotate) {
    console.error(`::error::Could not read the expiration date for slot ${activeSlot}. Refusing to rotate.`);
    process.exit(1);
  }
  const nowMs = Date.now();
  const remainingMs = activeSlotExpirationMs !== null ? activeSlotExpirationMs - nowMs : -1;
  const remainingDays = (remainingMs / (24 * 60 * 60 * 1000)).toFixed(1);

  if (!forceRotate && remainingMs > RENEWAL_THRESHOLD_MS) {
    writeStdoutLine(
      `Active API key (slot ${activeSlot}) expires on ${new Date(activeSlotExpirationMs).toISOString()} (${remainingDays} days remaining). Renewal threshold is ${RENEWAL_THRESHOLD_DAYS} days. Skipping rotation.`
    );
    writeGitHubOutput('rotated', 'false');
    return;
  }

  const targetSlot = activeSlot === 1 ? 2 : 1;

  if (dryRun) {
    writeStdoutLine(
      `Dry run: would rotate from slot ${activeSlot} to slot ${targetSlot} (${remainingDays} days remaining). No changes made.`
    );
    writeGitHubOutput('rotated', 'false');
    return;
  }

  const newExpirationDate = new Date(nowMs + NEW_KEY_LIFESPAN_DAYS * 24 * 60 * 60 * 1000);

  writeStdoutLine(
    `Rotating AGOL API key from slot ${activeSlot} to slot ${targetSlot} with new expiration ${newExpirationDate.toISOString()}...`
  );

  const updateOptions = {
    itemId,
    authentication,
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
  exitUnlessExpirationSaved(updatedKeyResponse, targetSlot, nowMs, newExpirationDate);
  writeStdoutLine(`Successfully generated new API key in slot ${targetSlot}.`);

  writeGitHubOutput('rotated', 'true');
  writeGitHubOutput('new_api_key', newApiKey);
  writeGitHubOutput('slot', String(targetSlot));
  writeGitHubOutput('expires_at', newExpirationDate.toISOString());
}

main().catch((error) => {
  console.error('Failed to check or rotate AGOL API key:', error?.message ?? String(error));
  process.exit(1);
});
