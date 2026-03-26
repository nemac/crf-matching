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
