# Utility Function Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Vitest and write unit tests for the pure utility functions in urlStateManagement, geocoding, and api modules.

**Architecture:** Install Vitest (leverages existing Vite config), create `__tests__/` directories alongside source files, write focused unit tests for each pure function. Minor refactoring to export two private helpers from api.js.

**Tech Stack:** Vitest, existing Vite config

---

## File Structure

```
src/util/__tests__/
  urlStateManagement.test.js   — tests for filtersToSearchParams, searchParamsToFilters
  geocoding.test.js            — tests for getDisplayStateCode, getFullStateName
  api.test.js                  — tests for normalizeRec, buildAirtableFilterFormula
```

**Modified files:**
- `package.json` — add vitest dev dependency and test scripts
- `src/util/api.js` — export `normalizeRec` and `buildAirtableFilterFormula`

---

### Task 1: Install Vitest and Add Test Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install vitest**

Run:
```bash
npm install --save-dev vitest
```

- [ ] **Step 2: Add test scripts to package.json**

Add these to the `"scripts"` section of `package.json`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify vitest runs (no tests yet)**

Run:
```bash
npm test
```
Expected: Vitest runs and reports "No test files found" or similar — confirms installation works.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "add vitest and test scripts"
```

---

### Task 2: Test urlStateManagement — filtersToSearchParams

**Files:**
- Create: `src/util/__tests__/urlStateManagement.test.js`

- [ ] **Step 1: Write the tests**

Create `src/util/__tests__/urlStateManagement.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { filtersToSearchParams, searchParamsToFilters } from '../urlStateManagement.js';

describe('filtersToSearchParams', () => {
  it('returns empty params when filters are empty and no location/view', () => {
    const filters = { activities: [], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, null);
    expect(params.toString()).toBe('');
  });

  it('serializes filter arrays as comma-separated encoded values', () => {
    const filters = { activities: ['Adaptation planning', 'Integrating Equity'], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, null);
    expect(params.get('activities')).toBe('Adaptation%20planning,Integrating%20Equity');
  });

  it('includes city and state when location is provided', () => {
    const filters = { activities: [], sectors: [], hazards: [], size: [], state: [] };
    const location = { city: 'Portland', state: 'Oregon' };
    const params = filtersToSearchParams(filters, location, null);
    expect(params.get('city')).toBe('Portland');
    expect(params.get('state')).toBe('Oregon');
  });

  it('omits city and state when location is null', () => {
    const filters = { activities: [], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, null);
    expect(params.has('city')).toBe(false);
    expect(params.has('state')).toBe(false);
  });

  it('includes view parameter when provided', () => {
    const filters = { activities: [], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, 'specialists');
    expect(params.get('view')).toBe('specialists');
  });

  it('serializes selected practitioners as comma-separated list', () => {
    const filters = { activities: [], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, null, ['rec123', 'rec456']);
    expect(params.get('selected')).toBe('rec123,rec456');
  });

  it('omits selected param when practitioners array is empty', () => {
    const filters = { activities: [], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, null, []);
    expect(params.has('selected')).toBe(false);
  });

  it('encodes special characters in filter values', () => {
    const filters = { activities: ['Sea level rise & coastal'], sectors: [], hazards: [], size: [], state: [] };
    const params = filtersToSearchParams(filters, null, null);
    const raw = params.get('activities');
    expect(raw).toContain('Sea%20level%20rise%20%26%20coastal');
  });
});
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
npx vitest run src/util/__tests__/urlStateManagement.test.js
```
Expected: All 8 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/util/__tests__/urlStateManagement.test.js
git commit -m "add filtersToSearchParams tests"
```

---

### Task 3: Test urlStateManagement — searchParamsToFilters

**Files:**
- Modify: `src/util/__tests__/urlStateManagement.test.js`

- [ ] **Step 1: Add searchParamsToFilters tests**

Append to `src/util/__tests__/urlStateManagement.test.js`:

```js
describe('searchParamsToFilters', () => {
  it('returns default empty structure when params are empty', async () => {
    const params = new URLSearchParams();
    const result = await searchParamsToFilters(params);
    expect(result.filters).toEqual({
      activities: [],
      sectors: [],
      hazards: [],
      size: [],
      state: [],
    });
    expect(result.location.selectedLocation).toBeNull();
    expect(result.view).toBeNull();
    expect(result.selectedPractitioners).toEqual([]);
  });

  it('parses filter arrays from comma-separated params', async () => {
    const params = new URLSearchParams();
    params.set('activities', 'Adaptation%20planning,Integrating%20Equity');
    const result = await searchParamsToFilters(params);
    expect(result.filters.activities).toEqual(['Adaptation planning', 'Integrating Equity']);
  });

  it('parses city and state into location object', async () => {
    const params = new URLSearchParams();
    params.set('city', 'Portland');
    params.set('state', 'Oregon');
    const result = await searchParamsToFilters(params);
    expect(result.location.selectedLocation).toEqual({
      city: 'Portland',
      state: 'Oregon',
      fullText: 'Portland, Oregon',
    });
    expect(result.location.selectedState).toBe('Oregon');
  });

  it('adds state from location to filters.state if not already present', async () => {
    const params = new URLSearchParams();
    params.set('city', 'Portland');
    params.set('state', 'Oregon');
    const result = await searchParamsToFilters(params);
    expect(result.filters.state).toEqual(['Oregon']);
  });

  it('treats literal string "null" for city/state as null', async () => {
    const params = new URLSearchParams();
    params.set('city', 'null');
    params.set('state', 'null');
    const result = await searchParamsToFilters(params);
    expect(result.location.selectedLocation).toBeNull();
  });

  it('parses view parameter', async () => {
    const params = new URLSearchParams();
    params.set('view', 'specialists');
    const result = await searchParamsToFilters(params);
    expect(result.view).toBe('specialists');
  });

  it('parses selected practitioners', async () => {
    const params = new URLSearchParams();
    params.set('selected', 'rec123,rec456');
    const result = await searchParamsToFilters(params);
    expect(result.selectedPractitioners).toEqual(['rec123', 'rec456']);
  });
});

describe('filtersToSearchParams → searchParamsToFilters roundtrip', () => {
  it('roundtrips filters through params and back', async () => {
    const filters = {
      activities: ['Adaptation planning'],
      sectors: ['Energy', 'Water'],
      hazards: ['Wildfire'],
      size: ['Under 10k'],
      state: ['Oregon'],
    };
    const location = { city: 'Portland', state: 'Oregon' };
    const view = 'specialists';
    const selectedPractitioners = ['rec123', 'rec456'];

    const params = filtersToSearchParams(filters, location, view, selectedPractitioners);
    const result = await searchParamsToFilters(params);

    expect(result.filters).toEqual(filters);
    expect(result.location.selectedLocation.city).toBe('Portland');
    expect(result.location.selectedLocation.state).toBe('Oregon');
    expect(result.view).toBe('specialists');
    expect(result.selectedPractitioners).toEqual(['rec123', 'rec456']);
  });
});
```

- [ ] **Step 2: Run tests to verify they pass**

Run:
```bash
npx vitest run src/util/__tests__/urlStateManagement.test.js
```
Expected: All 16 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/util/__tests__/urlStateManagement.test.js
git commit -m "add searchParamsToFilters and roundtrip tests"
```

---

### Task 4: Test geocoding helpers

**Files:**
- Create: `src/util/__tests__/geocoding.test.js`

- [ ] **Step 1: Write the tests**

Create `src/util/__tests__/geocoding.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { getDisplayStateCode, getFullStateName, STATE_MAPPINGS } from '../geocoding.js';

describe('getDisplayStateCode', () => {
  it('returns standard 2-letter state codes unchanged', () => {
    expect(getDisplayStateCode('CA')).toBe('CA');
    expect(getDisplayStateCode('NY')).toBe('NY');
    expect(getDisplayStateCode('TX')).toBe('TX');
  });

  it('converts 2-letter territory codes to 3-letter codes', () => {
    expect(getDisplayStateCode('PR')).toBe('PRI');
    expect(getDisplayStateCode('GU')).toBe('GUM');
    expect(getDisplayStateCode('AS')).toBe('ASM');
    expect(getDisplayStateCode('MP')).toBe('MNP');
    expect(getDisplayStateCode('VI')).toBe('VIR');
  });

  it('returns unknown codes unchanged', () => {
    expect(getDisplayStateCode('ZZ')).toBe('ZZ');
  });
});

describe('getFullStateName', () => {
  it('returns full name for standard state abbreviations', () => {
    expect(getFullStateName('CA')).toBe('California');
    expect(getFullStateName('NY')).toBe('New York');
    expect(getFullStateName('TX')).toBe('Texas');
  });

  it('returns full name for territory 2-letter codes', () => {
    expect(getFullStateName('PR')).toBe('Puerto Rico');
    expect(getFullStateName('GU')).toBe('Guam');
    expect(getFullStateName('AS')).toBe('American Samoa');
    expect(getFullStateName('VI')).toBe('Virgin Islands');
    expect(getFullStateName('MP')).toBe('Northern Mariana Islands');
  });

  it('returns full name for territory 3-letter codes', () => {
    expect(getFullStateName('PRI')).toBe('Puerto Rico');
    expect(getFullStateName('GUM')).toBe('Guam');
    expect(getFullStateName('ASM')).toBe('American Samoa');
  });

  it('returns empty string for null or undefined', () => {
    expect(getFullStateName(null)).toBe('');
    expect(getFullStateName(undefined)).toBe('');
    expect(getFullStateName('')).toBe('');
  });

  it('returns the input for unknown abbreviations', () => {
    expect(getFullStateName('ZZ')).toBe('ZZ');
  });
});

describe('STATE_MAPPINGS', () => {
  it('contains all 50 states', () => {
    const twoLetterStateCodes = Object.keys(STATE_MAPPINGS).filter(
      k => k.length === 2 && !['AS', 'GU', 'MP', 'PR', 'VI', 'DC'].includes(k)
    );
    expect(twoLetterStateCodes.length).toBe(50);
  });

  it('contains all 5 territory mappings (2-letter to 3-letter)', () => {
    expect(STATE_MAPPINGS['AS']).toBe('ASM');
    expect(STATE_MAPPINGS['GU']).toBe('GUM');
    expect(STATE_MAPPINGS['MP']).toBe('MNP');
    expect(STATE_MAPPINGS['PR']).toBe('PRI');
    expect(STATE_MAPPINGS['VI']).toBe('VIR');
  });
});
```

Note: `geocoding.js` has a top-level `const API_KEY = __AGOL_API_KEY__` that references a Vite define variable. Vitest uses the Vite config, so check if `vite.config.js` defines this. If the test fails due to `__AGOL_API_KEY__` not being defined, add a define in `vite.config.js` test section:

```js
test: {
  define: {
    __AGOL_API_KEY__: JSON.stringify('test-key'),
  },
}
```

However, check `vite.config.js` first — it likely already defines these via `define` and Vitest will pick them up.

- [ ] **Step 2: Run tests**

Run:
```bash
npx vitest run src/util/__tests__/geocoding.test.js
```
Expected: All tests PASS. If `__AGOL_API_KEY__` causes a ReferenceError, add the Vitest define override shown above.

- [ ] **Step 3: Commit**

```bash
git add src/util/__tests__/geocoding.test.js
git commit -m "add geocoding helper tests"
```

---

### Task 5: Export normalizeRec and buildAirtableFilterFormula from api.js

**Files:**
- Modify: `src/util/api.js:20` — add `export` to `normalizeRec`
- Modify: `src/util/api.js:50` — add `export` to `buildAirtableFilterFormula`

- [ ] **Step 1: Export normalizeRec**

In `src/util/api.js`, change line 20 from:
```js
const normalizeRec = (rec, fieldMap) => {
```
to:
```js
export const normalizeRec = (rec, fieldMap) => {
```

- [ ] **Step 2: Export buildAirtableFilterFormula**

In `src/util/api.js`, change line 50 from:
```js
function buildAirtableFilterFormula(
```
to:
```js
export function buildAirtableFilterFormula(
```

- [ ] **Step 3: Verify the app still builds**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/util/api.js
git commit -m "export normalizeRec and buildAirtableFilterFormula for testing"
```

---

### Task 6: Test api.js — normalizeRec

**Files:**
- Create: `src/util/__tests__/api.test.js`

Note: `api.js` imports `Airtable` and calls `Airtable.configure()` and `Airtable.base()` at module top level with `__AIRTABLE_TOKEN__` and `__AIRTABLE_BASE__` Vite defines. The test file must handle this — either Vitest picks up the defines from `vite.config.js`, or we add test-specific defines. Additionally, `api.js` imports `{ Category } from '@mui/icons-material'` (unused import). If this causes issues, the import may need to be present in the test environment.

The safest approach: import only the exported helpers, and let Vitest resolve the module. If top-level Airtable initialization fails, we'll need to mock it. Start optimistic.

- [ ] **Step 1: Write normalizeRec tests**

Create `src/util/__tests__/api.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { normalizeRec, buildAirtableFilterFormula } from '../api.js';
import { practitionerFieldMap } from '../../config/config.js';

const communityFieldMap = {
  airtableRecId: 'Airtable Record ID',
  name: 'Name',
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
};

describe('normalizeRec', () => {
  it('maps airtable field names to normalized keys', () => {
    const rec = {
      org_name: 'Test Org',
      org_states_territories: 'California',
      org_climate_hazards: 'Wildfire',
    };
    const result = normalizeRec(rec, practitionerFieldMap);
    expect(result.name).toBe('Test Org');
    expect(result.state).toBe('California');
    expect(result.hazards).toBe('Wildfire');
  });

  it('defaults missing fields to empty string for practitioner map', () => {
    const rec = { org_name: 'Test Org' };
    const result = normalizeRec(rec, practitionerFieldMap);
    expect(result.name).toBe('Test Org');
    expect(result.state).toBe('');
    expect(result.hazards).toBe('');
  });
});
```

Note: `normalizeRec` checks `fieldMap === communityFieldMap` by reference. Since we define `communityFieldMap` locally in the test, that reference check will always be `false` — so community-specific behavior (wrapping in arrays) won't trigger. This is correct because the community field map is module-private in `api.js`. Testing community normalization would require exporting `communityFieldMap` too. For now, we test the practitioner path only.

- [ ] **Step 2: Run tests**

Run:
```bash
npx vitest run src/util/__tests__/api.test.js
```
Expected: PASS. If it fails due to `__AIRTABLE_TOKEN__` or `__AIRTABLE_BASE__` not being defined, check `vite.config.js` for the define block. If those defines only exist in `.env`, add a `test.define` section to `vite.config.js`:
```js
test: {
  define: {
    __AIRTABLE_TOKEN__: JSON.stringify('test-token'),
    __AIRTABLE_BASE__: JSON.stringify('test-base'),
    __AGOL_API_KEY__: JSON.stringify('test-key'),
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add src/util/__tests__/api.test.js
git commit -m "add normalizeRec tests"
```

---

### Task 7: Test api.js — buildAirtableFilterFormula

**Files:**
- Modify: `src/util/__tests__/api.test.js`

- [ ] **Step 1: Add buildAirtableFilterFormula tests**

Append to `src/util/__tests__/api.test.js`:

```js
describe('buildAirtableFilterFormula', () => {
  const fieldMap = {
    activities: 'org_services_provided_other',
    hazards: 'org_climate_hazards',
    sectors: 'org_sectors',
    state: 'org_states_territories',
    size: 'org_comm_size',
  };

  it('returns empty string for empty criteria', () => {
    expect(buildAirtableFilterFormula({}, fieldMap)).toBe('');
  });

  it('returns empty string when all arrays are empty', () => {
    const criteria = { activities: [], hazards: [] };
    expect(buildAirtableFilterFormula(criteria, fieldMap)).toBe('');
  });

  it('builds FIND formula for single field with single value using AND', () => {
    const criteria = { activities: ['Adaptation planning'] };
    const result = buildAirtableFilterFormula(criteria, fieldMap, 'AND');
    expect(result).toBe(
      'AND(AND(FIND("Adaptation planning", "," & {org_services_provided_other} & ",")))'
    );
  });

  it('builds FIND formula for single field with multiple values using AND', () => {
    const criteria = { activities: ['Adaptation planning', 'Integrating Equity'] };
    const result = buildAirtableFilterFormula(criteria, fieldMap, 'AND');
    expect(result).toBe(
      'AND(AND(FIND("Adaptation planning", "," & {org_services_provided_other} & ","), FIND("Integrating Equity", "," & {org_services_provided_other} & ",")))'
    );
  });

  it('builds formula with OR operator', () => {
    const criteria = { activities: ['Adaptation planning', 'Integrating Equity'] };
    const result = buildAirtableFilterFormula(criteria, fieldMap, 'OR');
    expect(result).toBe(
      'OR(OR(FIND("Adaptation planning", "," & {org_services_provided_other} & ","), FIND("Integrating Equity", "," & {org_services_provided_other} & ",")))'
    );
  });

  it('combines multiple fields', () => {
    const criteria = {
      activities: ['Adaptation planning'],
      hazards: ['Wildfire'],
    };
    const result = buildAirtableFilterFormula(criteria, fieldMap, 'AND');
    expect(result).toBe(
      'AND(AND(FIND("Adaptation planning", "," & {org_services_provided_other} & ",")), AND(FIND("Wildfire", "," & {org_climate_hazards} & ",")))'
    );
  });

  it('skips criteria keys not in the field map', () => {
    const criteria = { unknownField: ['value'] };
    const result = buildAirtableFilterFormula(criteria, fieldMap, 'AND');
    expect(result).toBe('');
  });

  it('skips empty arrays in criteria', () => {
    const criteria = { activities: ['Adaptation planning'], hazards: [] };
    const result = buildAirtableFilterFormula(criteria, fieldMap, 'AND');
    expect(result).toBe(
      'AND(AND(FIND("Adaptation planning", "," & {org_services_provided_other} & ",")))'
    );
  });
});
```

- [ ] **Step 2: Run all tests**

Run:
```bash
npx vitest run src/util/__tests__/api.test.js
```
Expected: All tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/util/__tests__/api.test.js
git commit -m "add buildAirtableFilterFormula tests"
```

---

### Task 8: Run Full Test Suite and Final Verification

- [ ] **Step 1: Run all tests**

Run:
```bash
npm test
```
Expected: All tests across all 3 test files pass.

- [ ] **Step 2: Verify build still works**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit any remaining changes (if needed)**

If any vite.config.js changes were needed for test defines:
```bash
git add vite.config.js
git commit -m "add test defines for vitest"
```
