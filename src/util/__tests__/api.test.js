import { describe, it, expect } from 'vitest';
import { normalizeRec, buildAirtableFilterFormula } from '../api.js';
import { practitionerFieldMap } from '../../config/config.js';

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
