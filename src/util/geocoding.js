// util/geocoding.js
const GEOCODING_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest';
const GEOCODING_DETAIL_URL =
  'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
const API_KEY = __AGOL_API_KEY__;

// Map of state/territory abbreviations (both 2 and 3 letter) to full names
export const STATE_MAPPINGS = {
  // Standard 2-letter state codes
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',

  // 3-letter territory codes
  ASM: 'American Samoa',
  GUM: 'Guam',
  MNP: 'Northern Mariana Islands',
  PRI: 'Puerto Rico',
  VIR: 'Virgin Islands',

  // Map 2-letter codes to 3-letter codes for territories
  AS: 'ASM',
  GU: 'GUM',
  MP: 'MNP',
  PR: 'PRI',
  VI: 'VIR',
};

// Get the correct state code (2 or 3 letter) for display
export const getDisplayStateCode = (abbr) => {
  // If it's a territory with a 2-letter code, convert to 3-letter
  if (['AS', 'GU', 'MP', 'PR', 'VI'].includes(abbr)) {
    return STATE_MAPPINGS[abbr];
  }
  return abbr;
};

// Convert state abbreviation to full name
export const getFullStateName = (abbr) => {
  if (!abbr) return '';

  // If it's a 2-letter territory code, get the 3-letter code first
  const stateCode = ['AS', 'GU', 'MP', 'PR', 'VI'].includes(abbr) ? STATE_MAPPINGS[abbr] : abbr;

  return STATE_MAPPINGS[stateCode] || abbr;
};

export const searchLocations = async (searchText) => {
  if (!searchText || searchText.length < 3) return [];

  try {
    const params = new URLSearchParams({
      f: 'json',
      token: API_KEY,
      sourceCountry: 'USA',
      category: 'City',
      maxSuggestions: 5,
      text: searchText,
    });

    const response = await fetch(`${GEOCODING_URL}?${params}`);
    const data = await response.json();

    if (data.suggestions) {
      return data.suggestions.map((suggestion) => ({
        text: suggestion.text,
        magicKey: suggestion.magicKey,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
};

export const getLocationDetails = async (magicKey) => {
  try {
    const params = new URLSearchParams({
      f: 'json',
      token: API_KEY,
      magicKey: magicKey,
      outFields: 'City,RegionAbbr,Region',
    });

    const response = await fetch(`${GEOCODING_DETAIL_URL}?${params}`);
    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const location = data.candidates[0];
      const attributes = location.attributes;
      const stateAbbr = attributes.RegionAbbr || attributes.Region;
      const displayStateCode = getDisplayStateCode(stateAbbr);
      const fullStateName = getFullStateName(stateAbbr);

      return {
        city: attributes.City,
        state: fullStateName,
        fullText: `${attributes.City}, ${displayStateCode}`,
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting location details:', error);
    return null;
  }
};
