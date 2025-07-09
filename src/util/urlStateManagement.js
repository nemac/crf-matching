export const filtersToSearchParams = (filters, selectedLocation, view, selectedPractitioners = []) => {
  const params = new URLSearchParams();

  // Handle location
  if (selectedLocation) {
    params.set('city', selectedLocation.city);
    params.set('state', selectedLocation.state);
  }

  // Handle view
  if (view) {
    params.set('view', view);
  }

  // Handle selected practitioners
  if (selectedPractitioners.length > 0) {
    params.set('selected', selectedPractitioners.join(','));
  }

  // Handle filter arrays
  Object.entries(filters).forEach(([key, values]) => {
    if (values && values.length > 0) {
      const encoded = values.map(v => encodeURIComponent(v)).join(',');
      params.set(key, encoded);
    }
    });

  return params;
};

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

  const view = searchParams.get('view');

  // Parse selected practitioners
  const selectedParam = searchParams.get('selected');
  // const selectedPractitioners = selectedParam ? selectedParam.split(',') : [];
  const selectedPractitioners = selectedParam
    ? selectedParam.split(',').map(decodeURIComponent)
    : [];  

  // Parse each filter type with decoding
  Object.keys(filters).forEach((key) => {
    const param = searchParams.get(key);
    if (param) {
      filters[key] = param.split(',').map(decodeURIComponent);
    }
  });

  // Handle location separately
  const city = decodeURIComponent(searchParams.get('city'));
  const state = decodeURIComponent(searchParams.get('state'));

  if (city && state) {
    const locationDetails = {
      city,
      state,
      fullText: `${city}, ${state}`,
    };

    location.selectedLocation = locationDetails;
    location.selectedState = state;

    if (!filters.state.includes(state)) {
      filters.state = [state];
    }
  }

  return { filters, location, view, selectedPractitioners };
};

export const generateShareableUrl = (filters, selectedLocation, view, selectedPractitioners) => {
  const params = filtersToSearchParams(filters, selectedLocation, view, selectedPractitioners);
  
  const baseUrl = window.location.origin.replace(/\/$/, '');
  return `${baseUrl}?${params.toString()}`;
};
