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
