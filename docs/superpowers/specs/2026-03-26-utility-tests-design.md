# Utility Function Tests — Design Spec

## Goal

Add the first test coverage to the CRF Matching app, targeting pure utility functions with Vitest.

## Setup

- Install `vitest` as a dev dependency
- Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to package.json
- Vitest uses the existing `vite.config.js` automatically — no separate config needed

## Test Targets

### 1. `src/util/urlStateManagement.js`

**Functions:** `filtersToSearchParams`, `searchParamsToFilters`

Test cases:
- Roundtrip: filters → params → filters produces the same result
- Empty filters produce no filter params
- Location (city/state) serializes and deserializes correctly
- Null/missing location handled gracefully
- View parameter preserved
- Selected practitioners list serializes (comma-joined) and deserializes
- Special characters in filter values are encoded/decoded correctly
- Filter keys with empty arrays are omitted from params
- `searchParamsToFilters` returns correct default structure when params are empty
- City/state values of literal string `"null"` are treated as null

### 2. `src/util/geocoding.js`

**Functions:** `getDisplayStateCode`, `getFullStateName`

Test cases:
- Standard 2-letter state codes return themselves (`CA` → `CA`)
- Territory 2-letter codes convert to 3-letter (`PR` → `PRI`)
- `getFullStateName` returns full name for states (`CA` → `California`)
- `getFullStateName` returns full name for territories via 2-letter code (`PR` → `Puerto Rico`)
- `getFullStateName` returns full name for territories via 3-letter code (`PRI` → `Puerto Rico`)
- `getFullStateName` returns empty string for null/undefined input
- `getFullStateName` returns the input unchanged for unknown abbreviations

### 3. `src/util/api.js` — extracted helpers

**Refactoring required:** Export `normalizeRec` and `buildAirtableFilterFormula` so they can be imported in tests. These are currently module-private.

**`normalizeRec` test cases:**
- Maps Airtable field names to normalized keys using a field map
- Missing fields default to empty string (for practitioner map)
- Missing fields default to empty array (for community map)
- Non-array values wrapped in array when using community field map
- Already-array values left as-is for community field map

**`buildAirtableFilterFormula` test cases:**
- Single field, single value produces correct FIND formula
- Single field, multiple values joined with the specified operator (AND/OR)
- Multiple fields produce nested operator formula
- Empty criteria object returns empty string
- Criteria keys not in the field map are skipped
- Empty value arrays are skipped
- Default operator is AND

## File Structure

```
src/
  util/
    __tests__/
      urlStateManagement.test.js
      geocoding.test.js
      api.test.js
```

## Out of Scope

- Tests for Airtable-calling functions (fetchPractitioner, etc.)
- Tests for `generateShareableUrl` (depends on `window.location`)
- Component/rendering tests
- E2E tests
