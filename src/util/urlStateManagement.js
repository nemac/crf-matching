// util/urlStateManagement.js

import { getLocationDetails } from './geocoding';

// Convert filters object to URL search params
export const filtersToSearchParams = (filters, selectedLocation) => {
  const params = new URLSearchParams();

  // Handle location
  if (selectedLocation) {
    params.set('city', selectedLocation.city);
    params.set('state', selectedLocation.state);
  }

  // Handle filter arrays
  Object.entries(filters).forEach(([key, values]) => {
    if (values && values.length > 0) {
      // Use comma-separated values for arrays
      params.set(key, values.join(','));
    }
  });

  return params;
};

// Parse URL search params back to filters object
export const searchParamsToFilters = async (searchParams) => {
  const filters = {
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
    state: [],
  };

  const location = {
    selectedLocation: null,
    selectedState: '',
  };

  // Parse each filter type
  Object.keys(filters).forEach((key) => {
    const param = searchParams.get(key);
    if (param) {
      filters[key] = param.split(',');
    }
  });

  // Handle location separately
  const city = searchParams.get('city');
  const state = searchParams.get('state');

  if (city && state) {
    // Reconstruct location object
    const locationDetails = {
      city,
      state,
      fullText: `${city}, ${state}`,
    };

    location.selectedLocation = locationDetails;
    location.selectedState = state;

    // Ensure state is in filters
    if (!filters.state.includes(state)) {
      filters.state = [state];
    }
  }

  return { filters, location };
};

// Generate shareable URL
export const generateShareableUrl = (filters, selectedLocation) => {
  const params = filtersToSearchParams(filters, selectedLocation);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#/?${params.toString()}`;
};
