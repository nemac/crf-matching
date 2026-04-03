import { useSearchParams } from 'react-router-dom';
import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchRegistryComponent from '../components/RegistryComponent.jsx';
import { useEffect, useState } from 'react';
import {
  fetchFilteredPractitioners,
  fetchOptionsFromAirtable,
  fetchTotalPractitionerCount,
} from '../util/api.js';
import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import CallToActionButton from '../components/baseComponents/CallToActionButton.jsx';
import PullDownFilter from '../components/baseComponents/PulldownFilter.jsx';
import FilterRemoveTwo from '../components/baseComponents/FilterRemoveTwo.jsx';
import PageHeader from '../components/baseComponents/PageHeader.jsx';
import { searchLocations, getLocationDetails } from '../util/geocoding';
export default function SearchRegistry() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(9);

  const community = searchParams.get('community') ?? '';
  const state = searchParams.get('state') ?? '';
  const activities = searchParams.get('activities')?.split(',').filter(Boolean) ?? [];
  const hazards = searchParams.get('hazards')?.split(',').filter(Boolean) ?? [];
  const sectors = searchParams.get('sectors')?.split(',').filter(Boolean) ?? [];
  const size = searchParams.get('size')?.split(',').filter(Boolean) ?? [];

  const [filterSelections, setFilterSelections] = useState({
    activities,
    hazards,
    sectors,
    size,
  });
  const [availableOptions, setAvailableOptions] = useState({
    activities: [],
    hazards: [],
    sectors: [],
    size: [],
  });

  const [selectedLocation, setSelectedLocation] = useState(
    community ? { fullText: community, state } : null
  );
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationInputValue, setLocationInputValue] = useState(community);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleLocationInputChange = async (event, newInputValue, reason) => {
    setLocationInputValue(newInputValue);
    if (reason !== 'input') return;
    if (newInputValue.length >= 3) {
      setLocationLoading(true);
      const suggestions = await searchLocations(newInputValue);
      setLocationOptions(suggestions.map(s => ({ ...s, fullText: s.text })));
      setLocationLoading(false);
    } else {
      setLocationOptions([]);
    }
  };

  const handleLocationChange = async (event, newValue) => {
    if (newValue?.magicKey) {
      setLocationLoading(true);
      setLocationOptions([]);
      const details = await getLocationDetails(newValue.magicKey);
      if (details) {
        setSelectedLocation(details);
        setLocationInputValue(details.fullText);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('community', details.fullText);
        newParams.set('state', details.state);
        setSearchParams(newParams);
      }
      setLocationLoading(false);
    } else {
      setSelectedLocation(null);
      setLocationInputValue('');
      setLocationOptions([]);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('community');
      newParams.delete('state');
      setSearchParams(newParams);
    }
  };

  const filters = {
    state: state ? [state] : [],
    activities,
    hazards,
    sectors,
    size,
  };

  const searchKey = searchParams.toString();

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
    fetchOptionsFromAirtable(setAvailableOptions);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchFilteredPractitioners(filters, data => {
      setPractitioners(data);
      setLoading(false);
      setInitialLoad(false);
    });
  }, [searchKey]);

  const updateUrlFromFilters = (newSelections) => {
    const newParams = new URLSearchParams(searchParams);
    ['activities', 'hazards', 'sectors', 'size'].forEach(key => {
      if (newSelections[key]?.length > 0) {
        newParams.set(key, newSelections[key].join(','));
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
    setDisplayCount(9);
  };

  const handleFilterChange = (filterKey, newValues) => {
    const newSelections = { ...filterSelections, [filterKey]: newValues };
    setFilterSelections(newSelections);
    updateUrlFromFilters(newSelections);
  };

  const handleClearFilter = filterKey => {
    const newSelections = { ...filterSelections, [filterKey]: [] };
    setFilterSelections(newSelections);
    updateUrlFromFilters(newSelections);
  };

  const handleRemoveFilterValue = (filterKey, value) => {
    const newSelections = {
      ...filterSelections,
      [filterKey]: filterSelections[filterKey].filter(v => v !== value),
    };
    setFilterSelections(newSelections);
    updateUrlFromFilters(newSelections);
  };

  const handleFindPractitioners = () => {
    const newParams = new URLSearchParams();
    if (selectedLocation) {
      newParams.set('community', selectedLocation.fullText);
      newParams.set('state', selectedLocation.state);
    }
    if (filterSelections.activities.length > 0)
      newParams.set('activities', filterSelections.activities.join(','));
    if (filterSelections.hazards.length > 0)
      newParams.set('hazards', filterSelections.hazards.join(','));
    if (filterSelections.sectors.length > 0)
      newParams.set('sectors', filterSelections.sectors.join(','));
    if (filterSelections.size.length > 0)
      newParams.set('size', filterSelections.size.join(','));
    setSearchParams(newParams);
  };

  const getFilterText = (filterKey, label) => {
    const count = filterSelections[filterKey].length;
    if (count === 0) return label;
    return `${count} ${label} Selected`;
  };

  const registrySelectSx = {
    backgroundColor: '#F3F3F5',
    borderRadius: '8px',
  };

  if (initialLoad) {
    return (
      <>
        <NavBar />
        <FullPageSpinner />
      </>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <NavBar />
      <PageHeader
        title="Registry of Adaptation Practitioners"
        subtitle={
          <>
            Connect with vetted experts to build resilience in your community
          </>
        }
      />
      <Box sx={{ mt: 3, px: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: 'primary.main',
            flex: 'none',
            flexGrow: 0,
          }}
        >
          Community Location
        </Typography>
        <Autocomplete
          value={selectedLocation}
          onChange={handleLocationChange}
          inputValue={locationInputValue}
          onInputChange={handleLocationInputChange}
          options={
            selectedLocation
              ? [selectedLocation, ...locationOptions]
              : locationOptions
          }
          getOptionLabel={option => option?.fullText || option?.text || ''}
          isOptionEqualToValue={(option, value) =>
            option?.fullText === value?.fullText
          }
          filterOptions={x => x}
          autoComplete
          includeInputInList
          filterSelectedOptions
          loading={locationLoading}
          loadingText="Searching..."
          noOptionsText={
            locationInputValue.length < 3
              ? 'Type at least 3 characters'
              : 'No locations found'
          }
          open={locationInputValue.length >= 3 && locationOptions.length > 0}
          popupIcon={null}
          sx={{ width: '100%', mt: 1 }}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Enter the Community"
              sx={{
                backgroundColor: '#F3F3F5',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  height: 36,
                  padding: '0 12px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& input::placeholder': {
                  color: '#56657D',
                  opacity: 1,
                  fontSize: 16,
                  fontWeight: 400,
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {locationLoading ? (
                      <CircularProgress size={16} />
                    ) : (
                      <SearchIcon sx={{ color: '#56657D', fontSize: 16 }} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Box sx={{
          ml: 4,
          my: 0.5
        }}>
          <Typography component="div" variant="body2">
            Looking for a specific Practitioner? Search our database of{' '}
            <Box
              component="a"
              href="/AllPractitioners"
              sx={{
                color: 'text.secondary',
                fontSize: '14px',
                textDecoration: 'underline',
              }}
            >
              Practitioners
            </Box>
           </Typography> 
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '12px',
            mt: 3,
            mb: 4,
            backgroundColor: '#FFFFFF',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '4px',
              gap: '4px',
              width: 280,
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: 'primary.main',
                p: '4px',
              }}
            >
              Services Provided
            </Typography>
            <PullDownFilter
              filterName="services-filter"
              filterText={getFilterText('activities', 'Services')}
              availableOptions={availableOptions.activities}
              selectedValues={filterSelections.activities}
              onChange={e => handleFilterChange('activities', e.target.value)}
              boxSx={{ width: '100%', minWidth: 'unset', maxWidth: 'unset' }}
              selectSx={registrySelectSx}
            />
            {filterSelections.activities.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: '4px', width: '100%' }}>
                <Typography
                  onClick={() => handleClearFilter('activities')}
                  sx={{
                    fontSize: 12,
                    color: 'primary.linkBlue',
                    cursor: 'pointer',
                    px: '10px',
                  }}
                >
                  Clear All
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', px: '2px' }}>
                  {filterSelections.activities.map(value => (
                    <FilterRemoveTwo
                      key={value}
                      text={value}
                      onDelete={() => handleRemoveFilterValue('activities', value)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '4px',
              gap: '4px',
              width: 280,
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: 'primary.main',
                p: '4px',
              }}
            >
              Climate Hazards
            </Typography>
            <PullDownFilter
              filterName="hazards-filter"
              filterText={getFilterText('hazards', 'Hazards')}
              availableOptions={availableOptions.hazards}
              selectedValues={filterSelections.hazards}
              onChange={e => handleFilterChange('hazards', e.target.value)}
              boxSx={{ width: '100%', minWidth: 'unset', maxWidth: 'unset' }}
              selectSx={registrySelectSx}
            />
            {filterSelections.hazards.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: '4px', width: '100%' }}>
                <Typography
                  onClick={() => handleClearFilter('hazards')}
                  sx={{
                    fontSize: 12,
                    color: 'primary.linkBlue',
                    cursor: 'pointer',
                    px: '10px',
                  }}
                >
                  Clear All
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', px: '2px' }}>
                  {filterSelections.hazards.map(value => (
                    <FilterRemoveTwo
                      key={value}
                      text={value}
                      onDelete={() => handleRemoveFilterValue('hazards', value)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '4px',
              gap: '4px',
              width: 280,
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: 'primary.main',
                p: '4px',
              }}
            >
              Sectors
            </Typography>
            <PullDownFilter
              filterName="sectors-filter"
              filterText={getFilterText('sectors', 'Sectors')}
              availableOptions={availableOptions.sectors}
              selectedValues={filterSelections.sectors}
              onChange={e => handleFilterChange('sectors', e.target.value)}
              boxSx={{ width: '100%', minWidth: 'unset', maxWidth: 'unset' }}
              selectSx={registrySelectSx}
            />
            {filterSelections.sectors.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: '4px', width: '100%' }}>
                <Typography
                  onClick={() => handleClearFilter('sectors')}
                  sx={{
                    fontSize: 12,
                    color: 'primary.linkBlue',
                    cursor: 'pointer',
                    px: '10px',
                  }}
                >
                  Clear All
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', px: '2px' }}>
                  {filterSelections.sectors.map(value => (
                    <FilterRemoveTwo
                      key={value}
                      text={value}
                      onDelete={() => handleRemoveFilterValue('sectors', value)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '4px',
              gap: '4px',
              width: 280,
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: 'primary.main',
                p: '4px',
              }}
            >
              Population Size
            </Typography>
            <PullDownFilter
              filterName="size-filter"
              filterText={getFilterText('size', 'Population Sizes')}
              availableOptions={availableOptions.size}
              selectedValues={filterSelections.size}
              onChange={e => handleFilterChange('size', e.target.value)}
              boxSx={{ width: '100%', minWidth: 'unset', maxWidth: 'unset' }}
              selectSx={registrySelectSx}
            />
            {filterSelections.size.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', px: '4px', width: '100%' }}>
                <Typography
                  onClick={() => handleClearFilter('size')}
                  sx={{
                    fontSize: 12,
                    color: 'primary.linkBlue',
                    cursor: 'pointer',
                    px: '10px',
                  }}
                >
                  Clear All
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', px: '2px' }}>
                  {filterSelections.size.map(value => (
                    <FilterRemoveTwo
                      key={value}
                      text={value}
                      onDelete={() => handleRemoveFilterValue('size', value)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
            }}
          >
            <CallToActionButton
              onClick={handleFindPractitioners}
              iconStart={<SearchIcon />}
              text="Find Practitioners"
              buttonSx={{
                borderRadius: '99999px',
                height: 37,
                whiteSpace: 'nowrap',
              }}
              textSx={{
                fontSize: 18,
                fontWeight: 400,
              }}
            />
          </Box>
        </Box>
      </Box>
      <SearchRegistryComponent
        practitioners={practitioners}
        totalPractitioners={totalPractitioners}
        loading={loading}
        community={community}
        activities={filterSelections.activities}
        hazards={filterSelections.hazards}
        sectors={filterSelections.sectors}
        displayCount={displayCount}
        onLoadMore={() => setDisplayCount(prev => prev + 9)}
        source="registry"
      />
      <Footer />
    </Box>
  );
}
