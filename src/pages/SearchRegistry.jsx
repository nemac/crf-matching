import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import {
//   Autocomplete,
//   CircularProgress,
//   InputAdornment,
//   TextField,
// } from '@mui/material';
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
// import { searchLocations, getLocationDetails } from '../util/geocoding';
export default function SearchRegistry() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);

  const stateParam = searchParams.get('state')?.split(',').filter(Boolean) ?? [];
  const activities = searchParams.get('activities')?.split(',').filter(Boolean) ?? [];
  const hazards = searchParams.get('hazards')?.split(',').filter(Boolean) ?? [];
  const sectors = searchParams.get('sectors')?.split(',').filter(Boolean) ?? [];
  const size = searchParams.get('size')?.split(',').filter(Boolean) ?? [];

  const [filterSelections, setFilterSelections] = useState({
    state: stateParam,
    activities,
    hazards,
    sectors,
    size,
  });
  const [availableOptions, setAvailableOptions] = useState({
    state: [],
    activities: [],
    hazards: [],
    sectors: [],
    size: [],
  });

  const filters = {
    state: filterSelections.state,
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
    ['state', 'activities', 'hazards', 'sectors', 'size'].forEach(key => {
      if (newSelections[key]?.length > 0) {
        newParams.set(key, newSelections[key].join(','));
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
    setDisplayCount(12);
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
    setLoading(true);
    setDisplayCount(12);
    fetchFilteredPractitioners(filters, data => {
      setPractitioners(data);
      setLoading(false);
    });
  };

  const allStatesSelected = availableOptions.state.length > 0 && filterSelections.state.length === availableOptions.state.length;

  const getFilterText = (filterKey, label) => {
    const count = filterSelections[filterKey].length;
    if (count === 0) return label;
    if (filterKey === 'state' && allStatesSelected) return 'All States and Territories';
    return `${count} ${label} Selected`;
  };

  const handleStateFilterChange = (newValues) => {
    const hasAllOption = newValues.includes('All States and Territories');
    if (hasAllOption && !allStatesSelected) {
      const newSelections = { ...filterSelections, state: [...availableOptions.state] };
      setFilterSelections(newSelections);
      updateUrlFromFilters(newSelections);
    } else if (!hasAllOption && allStatesSelected) {
      const newSelections = { ...filterSelections, state: [] };
      setFilterSelections(newSelections);
      updateUrlFromFilters(newSelections);
    } else {
      const filtered = newValues.filter(v => v !== 'All States and Territories');
      const newSelections = { ...filterSelections, state: filtered };
      setFilterSelections(newSelections);
      updateUrlFromFilters(newSelections);
    }
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
      <Box sx={{ mt: 3, px: { xs: 4, sm: 6, md: 6 } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 1, mt: 3, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '4px',
                gap: 0.5,
                // flex: { xs: '1 1 100%', xl: '1 1 0' },
                flex:  { xs: '1 1 100%', md: '1 1 149px'},
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
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
                State or Territory
              </Typography>
              <PullDownFilter
                filterName="state-filter"
                filterText={getFilterText('state', 'States')}
                availableOptions={['All States and Territories', ...availableOptions.state]}
                selectedValues={allStatesSelected ? ['All States and Territories', ...filterSelections.state] : filterSelections.state}
                onChange={e => handleStateFilterChange(e.target.value)}
                boxSx={{ width: '100%', minWidth: 'unset', maxWidth: 'unset' }}
                selectSx={registrySelectSx}
              />
              {filterSelections.state.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: '4px', width: '100%' }}>
                  <Typography
                    onClick={() => handleClearFilter('state')}
                    sx={{
                      fontSize: 12,
                      color: 'primary.linkBlue',
                      cursor: 'pointer',
                      px: '10px',
                    }}
                  >
                    Clear All
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: '2px' }}>
                    {allStatesSelected ? (
                      <FilterRemoveTwo
                        text="All States and Territories"
                        onDelete={() => handleClearFilter('state')}
                      />
                    ) : (
                      filterSelections.state.map(value => (
                        <FilterRemoveTwo
                          key={value}
                          text={value}
                          onDelete={() => handleRemoveFilterValue('state', value)}
                        />
                      ))
                    )}
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
                  gap: 0.5,
                  flex:  { xs: '1 1 100%', md: '1 1 140px'},
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: '4px', width: '100%' }}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: '2px' }}>
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
              gap: 0.5,
              flex:  { xs: '1 1 100%', md: '1 1 140px'},
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: '4px', width: '100%' }}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: '2px' }}>
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
              gap: 0.5,
              flex:  { xs: '1 1 100%', md: '1 1 100px'},
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: '4px', width: '100%' }}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: '2px' }}>
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
              gap: 0.5,
              flex:  { xs: '1 1 100%', md: '1 1 150px'},
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: '4px', width: '100%' }}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: '2px' }}>
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

          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, flex: { xs: '1 1 100%', xl: '0 0 auto' } }}>
            <CallToActionButton
              onClick={handleFindPractitioners}
              iconStart={<SearchIcon />}
              text="Find Practitioners"
              buttonSx={{
                borderRadius: '99999px',
                whiteSpace: 'nowrap',
              }}
              textSx={{
                fontSize: 18,
                fontWeight: 'normal',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ ml: 2, mt: 0.5, mb: 1 }}>
          <Typography component="div" variant="body1">
            Looking for a specific Practitioner? Search our database of{' '}
            <Box
              component="a"
              href="/AllPractitioners"
              sx={{
                color: 'text.secondary',
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              Adaptation Practitioners
            </Box>
           </Typography>
        </Box>
      </Box>
      <SearchRegistryComponent
        practitioners={practitioners}
        totalPractitioners={totalPractitioners}
        loading={loading}
        state={filterSelections.state}
        activities={filterSelections.activities}
        hazards={filterSelections.hazards}
        sectors={filterSelections.sectors}
        displayCount={displayCount}
        onLoadMore={(pageSize) => setDisplayCount(prev => prev + pageSize)}
        source="registry"
      />
      <Footer />
    </Box>
  );
}
