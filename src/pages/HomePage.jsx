import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import FeatureCard from '../components/homePage/FeatureCard.jsx';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import {
  fetchOptionsFromAirtable,
  fetchTotalPractitionerCount,
} from '../util/api.js';
import { useEffect, useState } from 'react';
import AltActionButton from '../components/baseComponents/AltActionButton.jsx';
import CallToActionButton from '../components/baseComponents/CallToActionButton.jsx';
import searchbar_background from '../assets/searchbar_background.png';
import PullDownFilter from '../components/baseComponents/PulldownFilter.jsx';
import FilterRemoveTwo from '../components/baseComponents/FilterRemoveTwo.jsx';
import { useNavigate } from 'react-router-dom';
import { searchLocations, getLocationDetails } from '../util/geocoding';

export default function HomePage() {
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationInputValue, setLocationInputValue] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [filters, setFilters] = useState({
    activities: [],
    sectors: [],
    hazards: [],
  });
  const [availableOptions, setAvailableOptions] = useState({
    activities: [],
    sectors: [],
    hazards: [],
  });

  const handleLocationInputChange = async (event, newInputValue, reason) => {
    setLocationInputValue(newInputValue);
    if (reason !== 'input') return;
    if (newInputValue.length >= 3) {
      setLocationLoading(true);
      const suggestions = await searchLocations(newInputValue);
      setLocationOptions(
        suggestions.map(s => ({ ...s, fullText: s.text }))
      );
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
      }
      setLocationLoading(false);
    } else {
      setSelectedLocation(null);
    }
  };

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
    fetchOptionsFromAirtable(setAvailableOptions);
  }, []);

  const handleFilterChange = (filterKey, newValues) => {
    setFilters(prev => ({ ...prev, [filterKey]: newValues }));
  };

  const handleClearFilter = filterKey => {
    setFilters(prev => ({ ...prev, [filterKey]: [] }));
  };

  const handleRemoveFilterValue = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: prev[filterKey].filter(v => v !== value),
    }));
  };

  const getFilterText = (filterKey, label) => {
    const count = filters[filterKey].length;
    if (count === 0) return label;
    return `${count} ${label} Selected`;
  };

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Container disableGutters maxWidth={false}>
        <Stack direction="column" spacing={8} sx={{ bgcolor: '#FFFFFF' }}>
          {/* background image of search bar */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${searchbar_background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 394,
            }}
          >
            <Box
              sx={{
                width: '95%',
                minHeight: 250,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h1Hero"
                >
                  Registry of Adaptation Practitioners
                </Typography>
                <Typography variant="subtitleHero" component="div">
                  Connect with vetted experts to build resilience in your
                  community or organization.
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#FFFFFF99',
                    width: '100%',
                    minHeight: 84,
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    mb: { xs: 4, md: 0 },
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {/* searching fields */}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Autocomplete
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      inputValue={locationInputValue}
                      onInputChange={handleLocationInputChange}
                      options={selectedLocation ? [selectedLocation, ...locationOptions] : locationOptions}
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
                      sx={{ flexGrow: 1, minWidth: 200 }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="Enter the community"
                          sx={{
                            bgcolor: '#FFFFFF',
                            borderRadius: 3,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              height: 36,
                              padding: '0 12px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <LocationOnIcon sx={{ color: 'grey.500', mr: 0.5 }} />
                            ),
                            endAdornment: locationLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null,
                          }}
                        />
                      )}
                    />
                    {[
                      { key: 'activities', filterName: 'services filter', label: 'Services' },
                      { key: 'hazards', filterName: 'Hazards filter', label: 'Hazards' },
                      { key: 'sectors', filterName: 'Sectors filter', label: 'Sectors' },
                    ].map(({ key, filterName, label }) => (
                      <Box key={key} sx={{ width: 250, minWidth: 250, maxWidth: 250 }}>
                        <PullDownFilter
                          filterName={filterName}
                          filterText={getFilterText(key, label)}
                          availableOptions={availableOptions[key]}
                          selectedValues={filters[key]}
                          onChange={e => handleFilterChange(key, e.target.value)}
                        />
                        {filters[key].length > 0 && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, mt: '4px' }}>
                            <Typography
                              onClick={() => handleClearFilter(key)}
                              sx={{
                                fontSize: 12,
                                color: 'primary.linkBlue',
                                cursor: 'pointer',
                              }}
                            >
                              Clear All
                            </Typography>
                            {filters[key].map(value => (
                              <FilterRemoveTwo
                                key={value}
                                text={value}
                                onDelete={() => handleRemoveFilterValue(key, value)}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
                    <CallToActionButton
                      buttonSx={{
                        borderRadius: 12,
                      }}
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (selectedLocation) {
                          params.set('community', selectedLocation.fullText);
                          params.set('state', selectedLocation.state);
                        }
                        if (filters.activities.length > 0)
                          params.set(
                            'activities',
                            filters.activities.join(',')
                          );
                        if (filters.hazards.length > 0)
                          params.set('hazards', filters.hazards.join(','));
                        if (filters.sectors.length > 0)
                          params.set('sectors', filters.sectors.join(','));
                        navigate(`/Registry?${params.toString()}`);
                      }}
                      iconStart=<SearchIcon />
                      textSx={{
                        fontSize: 16,
                        fontWeight: 'normal',
                      }}
                      text="Find Practitioners"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/*this is where the search bar ends and the browse all start */}
          <Box sx={{ textAlign: 'center', pb: 4 }}>
            <Typography variant="h4">
              Browse all{' '}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  fontSize: '24px',
                  color: 'primary.ctaDarkBlue',
                }}
              >
                {totalPractitioners}
              </Box>{' '}
              practitioners
            </Typography>
            {/* Mid below */}
            <Typography variant="body1" component="div" sx={{ mb: 4 }}>
              A simple, streamlined process to connect you with the expertise
              you need.
            </Typography>
            {/* Button below should be changed once the main practitioners page is done */}
            <AltActionButton
              to="/AllPractitioners"
              text="Browse All Practitioners"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: { xs: 2, md: '96px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'primary.sectionBg',
                border: '1px solid #E1F5FE',
                borderRadius: '8px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 0.5,
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    How the Registry Works
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 6,
                  py: 0.5,
                }}
              >
                <FeatureCard
                  icon={<SearchIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />}
                  title="Search and Filter"
                  description="Use our guided search to find practitioners with the right expertise and focus for your needs."
                />
                <FeatureCard
                  icon={
                    <PeopleOutlineOutlinedIcon
                      sx={{ color: '#FFFFFF', fontSize: 24 }}
                    />
                  }
                  title="Review Profiles"
                  description="Explore detailed profiles, including specailizations, community focus and work examples."
                />
                <FeatureCard
                  icon={
                    <HandshakeOutlinedIcon
                      sx={{ color: '#FFFFFF', fontSize: 24 }}
                    />
                  }
                  title="Connect & Collaborate"
                  description="Contact practitioners directly to discuss your project and build a resilient future together."
                />
              </Box>
            </Box>
          </Box>
          {/*end how reg works, begin two categories*/}
          <Box
            sx={{
              textAlign: 'center',
              gap: { xs: 4, md: 12 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                minHeight: 223,
                width: '100%',
                maxWidth: 992,
                mx: 'auto',
              }}
            >
              <Typography component="div" variant="h3" sx={{ mb: 6}}>
                The Registry includes two categories of practitioners
              </Typography>
              <Box sx={{ minHeight: 156, gap: 24 }}>
                <Grid container spacing={8}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ minHeight: 140 }}>
                      <Typography variant="h4">
                        Broad service providers
                      </Typography>
                      <Typography component="div" variant="body1">
                         Have wide-ranging adaptation expertise, supporting community
                         efforts to undertake cross-sector climate change vulnerability
                         assessments, develop adaptation plans, and plan or implement actions
                         focused on reducing their vulnerability to climate change impacts.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography variant="h4">
                        Specialists
                      </Typography>
                      <Typography component="div" variant="body1">
                        Are organizations that focus more narrowly on one or more specific climate hazards,
                        topics, or sectors, supporting communities in planning through implementation of
                        adaptation-focused actions within a specific category (e.g., wildfire resilience,
                        public health, spatial analysis, ecosystem restoration, insurance systems).
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
          {/* End registry includes section, begin how to apply */}
          <Box
            sx={{
              pt: 4,
              pb: 8,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              How to apply
            </Typography>
            <Typography component="div" variant="body1" sx={{ textAlign: 'center' }}>
              Be recognized as an expert helping communities build a more
              resilient future!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
              }}
            >
              <CallToActionButton
                to="/Howtoapply"
                text="Apply to the Registry"
              />
            </Box>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
