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
  fetchTotalPractitionerCount,
} from '../util/api.js';
import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import CallToActionButton from '../components/baseComponents/CallToActionButton.jsx';
import PullDownFilter from '../components/baseComponents/PulldownFilter.jsx';
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
  const activities = searchParams.get('activities')?.split(',') ?? [];
  const hazards = searchParams.get('hazards')?.split(',') ?? [];
  const sectors = searchParams.get('sectors')?.split(',') ?? [];

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
  };

  const searchKey = searchParams.toString();

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
    setLoading(true);
    fetchFilteredPractitioners(filters, data => {
      setPractitioners(data);
      setLoading(false);
      setInitialLoad(false);
    });
  }, [searchKey]);

  if (initialLoad) {
    return (
      <>
        <NavBar />
        <FullPageSpinner />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <PageHeader
        title="Registry of Adaptation Practitioners"
        subtitle={
          <>
            Connect with vetted experts to build resilience in your community or
            organization.
            <br />
            Looking for a specific Practitioner? Search our database of{' '}
            <Box
              component="a"
              href="/AllPractitioners"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                textDecoration: 'underline',
              }}
            >
              Practitioners
            </Box>
          </>
        }
      />
      <Box sx={{ mt: 3, px: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '19px',
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
        <Box
          sx={{
            display: 'flex',
            alignContent: 'flex-start',
            justifyContent: 'space-between',
            m: 3,
          }}
        >
          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Services Provided
            </Typography>
          </Box>
          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Climate Hazards
            </Typography>
          </Box>

          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Sectors
            </Typography>
          </Box>

          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Population Size
            </Typography>
          </Box>
          <CallToActionButton />
        </Box>
      </Box>
      <SearchRegistryComponent
        practitioners={practitioners}
        totalPractitioners={totalPractitioners}
        loading={loading}
        community={community}
        activities={activities}
        hazards={hazards}
        sectors={sectors}
        displayCount={displayCount}
        onLoadMore={() => setDisplayCount(prev => prev + 9)}
      />
      <Footer />
    </>
  );
}
