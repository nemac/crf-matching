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
