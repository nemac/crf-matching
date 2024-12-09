import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
  Container,
  Box,
  Paper,
  Button,
  Grid,
  Collapse,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import WindowIcon from '@mui/icons-material/Window';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { fetchFilteredPractitioners, fetchOptionsFromAirtable, fetchAllPractitioners } from '../util/api';
import ComparisonBoard from '../components/ComparisonBoard';
import PractitionerCard from '../components/PractitionerCard';
import { searchLocations, getLocationDetails } from '../util/geocoding';

const PRACTITIONERS_PER_PAGE = 6;

const LocationSearch = ({ value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Update input value when value prop changes
  useEffect(() => {
    if (value?.fullText) {
      setInputValue(value.fullText);
    }
  }, [value]);

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length >= 3) {
      setLoading(true);
      const suggestions = await searchLocations(newInputValue);
      // Transform suggestions to match the selected value format
      const transformedSuggestions = suggestions.map((suggestion) => ({
        ...suggestion,
        fullText: suggestion.text,
      }));
      setOptions(transformedSuggestions);
      setLoading(false);
    } else {
      setOptions([]);
    }
  };

  const handleChange = async (event, newValue) => {
    if (newValue?.magicKey) {
      setLoading(true);
      const details = await getLocationDetails(newValue.magicKey);
      if (details) {
        onChange(event, details);
      }
      setLoading(false);
    } else {
      onChange(event, null);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={value ? [value, ...options] : options}
      getOptionLabel={(option) => {
        if (!option) return '';
        return option.fullText || option.text || '';
      }}
      isOptionEqualToValue={(option, value) => {
        if (!option || !value) return false;
        return option.fullText === value.fullText;
      }}
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
      filterSelectedOptions
      loading={loading}
      loadingText="Searching..."
      noOptionsText={inputValue.length < 3 ? 'Type at least 3 characters' : 'No locations found'}
      open={open && inputValue.length >= 3}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      disabled={disabled}
      sx={{ flexGrow: 1 }}
      popupIcon={null}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Enter your city"
          sx={{
            bgcolor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              '& .MuiOutlinedInput-input': {
                paddingRight: '14px !important',
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: <LocationOnIcon sx={{ ml: 1, mr: -0.5, color: 'grey.500' }} />,
            endAdornment: loading ? (
              <CircularProgress
                color="inherit"
                size={20}
              />
            ) : null,
          }}
        />
      )}
    />
  );
};

const FilterSection = ({ title, description, type, selected, availableOptions, onAdd, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    onAdd(option);
    handleClose();
  };

  const getButtonText = () => {
    switch (type) {
      case 'activities':
        return 'Add activity';
      case 'hazards':
        return 'Add hazard';
      case 'sectors':
        return 'Add sector';
      default:
        return 'Add';
    }
  };

  // Filter out already selected options
  const availableChoices = availableOptions.filter((option) => !selected.includes(option));

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Button
          variant="text"
          sx={{
            textTransform: 'none',
            color: 'primary.main',
          }}
        >
          Learn more
        </Button>
      </Box>

      <Typography
        variant="body2"
        sx={{ mb: 2, color: 'text.secondary' }}
      >
        {description}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        {selected.map((item) => (
          <Chip
            key={item}
            label={item}
            onDelete={() => onRemove(item)}
            sx={{
              borderRadius: '16px',
              bgcolor: 'primary.tan',
              '& .MuiChip-deleteIcon': {
                color: 'primary.main',
              },
            }}
          />
        ))}

        <Button
          startIcon={<AddIcon />}
          onClick={handleClick}
          disabled={availableChoices.length === 0}
          sx={{
            bgcolor: 'grey.400',
            color: 'white',
            textTransform: 'none',
            borderRadius: '20px',
            '&:hover': {
              bgcolor: 'grey.500',
            },
            '&.Mui-disabled': {
              bgcolor: 'grey.300',
              color: 'grey.500',
            },
          }}
        >
          {getButtonText()}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              maxHeight: 300,
              width: 400,
            },
          }}
        >
          {availableChoices.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleSelect(option)}
              sx={{
                '&:hover': {
                  bgcolor: 'primary.tan',
                },
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        mb: 3,
        gap: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: view === 'cards' ? 'primary.main' : 'white',
          color: view === 'cards' ? 'white' : 'primary.main',
          borderRadius: '20px',
          cursor: 'pointer',
          minWidth: '120px',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: view === 'cards' ? 2 : 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: view === 'cards' ? 'primary.dark' : 'grey.100',
          },
        }}
        onClick={() => onViewChange(null, 'cards')}
      >
        <WindowIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
        Cards
      </Box>
      <Box
        sx={{
          bgcolor: view === 'compare' ? 'primary.main' : 'white',
          color: view === 'compare' ? 'white' : 'primary.main',
          borderRadius: '20px',
          cursor: 'pointer',
          minWidth: '120px',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: view === 'compare' ? 2 : 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: view === 'compare' ? 'primary.dark' : 'grey.100',
          },
        }}
        onClick={() => onViewChange(null, 'compare')}
      >
        <CompareArrowsIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
        Compare
      </Box>
    </Box>
  );
};

export default function LandingPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState('cards');
  const [displayCount, setDisplayCount] = useState(PRACTITIONERS_PER_PAGE);
  const [filters, setFilters] = useState({
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });
  const [availableOptions, setAvailableOptions] = useState({
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  // Helper to check if all filters are empty
  const areFiltersEmpty = () => {
    return Object.values(filters).every((arr) => arr.length === 0);
  };

  // Get community name based on selection state
  const getCommunityName = () => {
    if (areFiltersEmpty()) {
      return 'My Community';
    }
    return selectedLocation ? `${selectedLocation.city}, ${selectedLocation.state}` : 'My Community';
  };

  const community = {
    name: getCommunityName(),
    state: filters.state || (selectedState ? [selectedState] : []), // Use filters.state if available
    activities: filters.activities,
    sectors: filters.sectors,
    hazards: filters.hazards,
    size: filters.size,
    totalCategories:
      (filters.state?.length || (selectedState ? 1 : 0)) +
      filters.activities.length +
      filters.sectors.length +
      filters.hazards.length +
      filters.size.length,
  };

  const visiblePractitioners = practitioners.slice(0, displayCount);
  const hasMorePractitioners = practitioners.length > displayCount;
  const hasAnyFilters = Object.values(filters).some((arr) => arr.length > 0) || selectedState;

  useEffect(() => {
    fetchOptionsFromAirtable(setAvailableOptions);
  }, []);

  useEffect(() => {
    // Get total practitioners count
    fetchAllPractitioners((practitioners) => {
      setTotalPractitioners(practitioners.length);
    });
  }, []);

  useEffect(() => {
    if (Object.values(filters).some((arr) => arr.length > 0)) {
      fetchFilteredPractitioners(filters, setPractitioners);
    } else {
      setPractitioners([]);
    }
  }, [filters]);

  const handleLocationSelect = (event, newValue) => {
    setSelectedLocation(newValue);
    if (newValue) {
      setSelectedState(newValue.state);
      setFilters((prev) => ({
        ...prev,
        state: [newValue.state],
      }));
    } else {
      setSelectedState('');
      setFilters((prev) => ({
        ...prev,
        state: [],
      }));
    }
  };

  const handleSelectionChange = (category, newSelections) => {
    if (category === 'state') {
      // Clear location selection if state is removed
      if (newSelections.length === 0) {
        setSelectedLocation(null);
        setSelectedState('');
      }
      // Update filters
      setFilters((prev) => ({
        ...prev,
        [category]: newSelections,
      }));
    } else {
      // Handle other categories normally
      setFilters((prev) => ({
        ...prev,
        [category]: newSelections,
      }));
    }
  };

  const handleAddFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: [...prev[category], value],
    }));
  };

  const handleRemoveFilter = (category, itemToRemove) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== itemToRemove),
    }));
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setCurrentView(newView);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4 }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 1,
          }}
        >
          Looking to connect to an adaptation practitioner?
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            bgcolor: 'grey.100',
            p: 3,
            borderRadius: 2,
            mt: 3,
          }}
        >
          {/* Location Search Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              Where is your community?
            </Typography>

            <LocationSearch
              value={selectedLocation}
              onChange={handleLocationSelect}
              disabled={false}
            />

            {selectedLocation && (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedLocation(null);
                  setSelectedState('');
                }}
                sx={{
                  bgcolor: 'grey.400',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: 'grey.500',
                  },
                }}
              >
                Change your community
              </Button>
            )}
          </Box>

          {/* Filter Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <TuneIcon sx={{ color: 'primary.main' }} />
            <Typography
              variant="body1"
              sx={{ color: 'primary.main' }}
            >
              Filter practitioners by their expertise
            </Typography>
          </Box>

          {/* Filter Sections */}
          <Collapse in={showFilters}>
            <Box sx={{ mt: 3 }}>
              <FilterSection
                title="Find practitioners by activities that are important in your community"
                description="Brief JARGON free summary of what activities are in adaptation."
                type="activities"
                selected={filters.activities}
                availableOptions={availableOptions.activities}
                onAdd={(value) => handleAddFilter('activities', value)}
                onRemove={(value) => handleRemoveFilter('activities', value)}
              />

              <FilterSection
                title="Find practitioners by hazards that are affecting your community"
                description="Brief JARGON free summary of what hazards are in adaptation."
                type="hazards"
                selected={filters.hazards}
                availableOptions={availableOptions.hazards}
                onAdd={(value) => handleAddFilter('hazards', value)}
                onRemove={(value) => handleRemoveFilter('hazards', value)}
              />

              <FilterSection
                title="Find practitioners by important sectors in your community"
                description="Brief JARGON free summary of what sectors are in adaptation."
                type="sectors"
                selected={filters.sectors}
                availableOptions={availableOptions.sectors}
                onAdd={(value) => handleAddFilter('sectors', value)}
                onRemove={(value) => handleRemoveFilter('sectors', value)}
              />
            </Box>
          </Collapse>
        </Paper>

        {/* Practitioners Section */}
        {practitioners.length > 0 && hasAnyFilters && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              Adaptation practitioners that can help your community
            </Typography>

            <ViewToggle
              view={currentView}
              onViewChange={handleViewChange}
            />

            {currentView === 'cards' ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: 'text.secondary' }}
                >
                  {visiblePractitioners.length} out of {practitioners.length} practitioners selected from the{' '}
                  {totalPractitioners} available in the practitioner registry
                </Typography>

                <Grid
                  container
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  {visiblePractitioners.map((practitioner, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                    >
                      <PractitionerCard practitioner={practitioner} />
                    </Grid>
                  ))}
                </Grid>

                {hasMorePractitioners && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      onClick={() => setDisplayCount((prev) => prev + PRACTITIONERS_PER_PAGE)}
                      variant="outlined"
                      sx={{
                        color: 'text.primary',
                        backgroundColor: 'white',
                        border: '1px solid',
                        borderColor: 'grey.300',
                        textTransform: 'none',
                        boxShadow: 1,
                        px: 4,
                        py: 1,
                        '&:hover': {
                          backgroundColor: 'grey.50',
                          borderColor: 'grey.400',
                        },
                      }}
                    >
                      Load more practitioners
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              // Comparison view
              <ComparisonBoard
                community={community}
                practitioners={practitioners}
                isSelectable={true}
                availableOptions={availableOptions}
                onSelectionChange={handleSelectionChange}
                displayCount={displayCount}
                setDisplayCount={setDisplayCount}
              />
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}
