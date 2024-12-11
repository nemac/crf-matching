import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import WindowIcon from '@mui/icons-material/Window';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShareIcon from '@mui/icons-material/Share';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { PersonOffOutlined } from '@mui/icons-material';
import { fetchFilteredPractitioners, fetchOptionsFromAirtable, fetchAllPractitioners } from '../util/api';
import Toast from '../components/Toast';
import ComparisonBoard from '../components/ComparisonBoard';
import PractitionerCard from '../components/PractitionerCard';
import { searchLocations, getLocationDetails } from '../util/geocoding';
import { filtersToSearchParams, searchParamsToFilters, generateShareableUrl } from '../util/urlStateManagement';

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
            bgcolor: 'primary.white',
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
      case 'size':
        return 'Add population';
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
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'space-between',
          gap: 1,
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
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
            textDecoration: 'underline',
            padding: '6px 0',
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
            color: 'primary.white',
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

const ViewToggle = ({ view, onViewChange, selectedCount, onClearSelected }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        mb: 3,
        gap: 2,
        position: 'relative', // For absolute positioning of clear button
      }}
    >
      <Box
        sx={{
          bgcolor: view === 'cards' ? 'primary.main' : 'white',
          color: view === 'cards' ? 'primary.white' : 'primary.main',
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
          bgcolor: view === 'compare' ? 'primary.main' : 'primary.white',
          color: view === 'compare' ? 'primary.white' : 'primary.main',
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

      {/* Clear Selected Button - Only show when there are selected practitioners */}
      {selectedCount > 0 && (
        <Button
          onClick={onClearSelected}
          startIcon={<PersonOffOutlined />}
          sx={{
            position: 'absolute',
            right: 0,
            bgcolor: 'primary.white',
            color: 'primary.main',
            border: '1px solid',
            borderColor: 'primary.borderGray',
            borderRadius: '20px',
            boxShadow: 1,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Clear selected ({selectedCount})
        </Button>
      )}
    </Box>
  );
};

export default function LandingPage() {
  const theme = useTheme();
  const [toastOpen, setToastOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState('cards');
  const [displayCount, setDisplayCount] = useState(PRACTITIONERS_PER_PAGE);
  const [selectedForComparison, setSelectedForComparison] = useState(new Set());
  const [searchParams, setSearchParams] = useSearchParams();
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

  // Load state from URL on initial render
  useEffect(() => {
    const loadStateFromUrl = async () => {
      if (searchParams.toString()) {
        const { filters: urlFilters, location, view } = await searchParamsToFilters(searchParams);

        // Update all state from URL
        setFilters(urlFilters);
        setSelectedLocation(location.selectedLocation);
        setSelectedState(location.selectedState);
        if (view) {
          setCurrentView(view);
        }
      }
    };

    loadStateFromUrl();
  }, []); // Only run on mount

  // Helper to check if all filters are empty
  const areFiltersEmpty = () => {
    return Object.values(filters).every((arr) => arr.length === 0);
  };

  // Update URL when filters or location change
  useEffect(() => {
    const params = filtersToSearchParams(filters, selectedLocation, currentView);
    setSearchParams(params);
  }, [filters, selectedLocation, currentView]);

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

  const handleShare = async () => {
    const shareableUrl = generateShareableUrl(filters, selectedLocation, currentView);

    try {
      await navigator.clipboard.writeText(shareableUrl);
      setToastOpen(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

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

  const handleClearAllFilters = () => {
    setFilters({
      activities: [],
      sectors: [],
      hazards: [],
      size: [],
      // Don't clear state/location as that's handled separately
      state: filters.state,
    });
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      // When switching to compare view, filter practitioners to only show selected ones
      if (newView === 'compare' && selectedForComparison.size > 0) {
        // Create a filtered version of practitioners that only includes selected ones
        const selectedPractitioners = practitioners.filter((p) => selectedForComparison.has(p.airtableRecId));
        // Update display count to match number of selected practitioners
        setDisplayCount(selectedPractitioners.length);
      } else if (newView === 'cards') {
        // When switching back to cards view, reset to show all practitioners
        // but maintain original pagination
        setDisplayCount(PRACTITIONERS_PER_PAGE);
      }
      setCurrentView(newView);
    }
  };

  const handleResetCommunity = () => {
    // Reset location state
    setSelectedLocation(null);
    setSelectedState('');
    setSelectedForComparison(new Set());

    // Reset all filters
    setFilters({
      activities: [],
      sectors: [],
      hazards: [],
      size: [],
      state: [],
    });

    // Reset practitioners
    setPractitioners([]);

    // Reset display count back to initial value
    setDisplayCount(PRACTITIONERS_PER_PAGE);

    // Collapse filters section if it's expanded
    setShowFilters(false);

    // Reset view back to cards if in compare mode
    setCurrentView('cards');
  };

  const handleComparisonSelect = (practitionerId, isSelected) => {
    setSelectedForComparison((prev) => {
      const newSelected = new Set(prev);
      if (isSelected) {
        newSelected.add(practitionerId);
      } else {
        newSelected.delete(practitionerId);
      }
      return newSelected;
    });
  };

  const handleClearSelectedPractitioners = () => {
    setSelectedForComparison(new Set());
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
              alignItems: {
                xs: 'stretch',
                md: 'center',
              },
              gap: 2,
              mb: 2,
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
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
                onClick={handleResetCommunity}
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
              justifyContent: 'space-between',
              gap: 1,
              cursor: 'pointer',
            }}
          >
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
            {/* Only show clear button if there are filters applied */}
            {(filters.activities.length > 0 ||
              filters.sectors.length > 0 ||
              filters.hazards.length > 0 ||
              filters.size.length > 0) && (
              <Button
                startIcon={<ClearAllIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent filter panel from toggling
                  handleClearAllFilters();
                }}
                sx={{
                  color: 'primary.main',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'primary.tan',
                  },
                }}
              >
                Clear all filters
              </Button>
            )}
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
              <FilterSection
                title="Find practitioners by community population size"
                description="Brief JARGON free summary of what community size means in adaptation."
                type="size"
                selected={filters.size}
                availableOptions={availableOptions.size}
                onAdd={(value) => handleAddFilter('size', value)}
                onRemove={(value) => handleRemoveFilter('size', value)}
              />
            </Box>
          </Collapse>
        </Paper>
        {/* Practitioners Section */}
        {practitioners.length > 0 && hasAnyFilters && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                }}
              >
                Adaptation practitioners that can help your community
              </Typography>

              <Button
                onClick={handleShare}
                startIcon={<ShareIcon />}
                sx={{
                  bgcolor: 'primary.white',
                  color: 'primary.main',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  ml: 2,
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  fontSize: {
                    xs: '0.875rem',
                    sm: '1rem',
                  },
                }}
              >
                Share Community
              </Button>

              <Toast
                open={toastOpen}
                message="URL Copied"
                onClose={handleToastClose}
              />
            </Box>
            <ViewToggle
              view={currentView}
              onViewChange={handleViewChange}
              selectedCount={selectedForComparison.size}
              onClearSelected={handleClearSelectedPractitioners}
            />
            {currentView === 'cards' ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: 'text.secondary' }}
                >
                  {visiblePractitioners.length} out of {practitioners.length} practitioners selected from the{' '}
                  {totalPractitioners} available in the{' '}
                  <a
                    href="https://climatesmartcommunity.org/apply-now-the-registry-of-climate-adaptation-and-resilience-professionals/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'inherit',
                      textDecoration: 'underline',
                    }}
                  >
                    practitioner registry
                  </a>
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
                      <PractitionerCard
                        practitioner={practitioner}
                        onComparisonSelect={handleComparisonSelect}
                        isSelectedForComparison={selectedForComparison.has(practitioner.airtableRecId)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              // Compare view
              <ComparisonBoard
                community={community}
                practitioners={practitioners.filter((p) =>
                  selectedForComparison.size === 0 ? true : selectedForComparison.has(p.airtableRecId)
                )}
                isSelectable={true}
                availableOptions={availableOptions}
                onSelectionChange={handleSelectionChange}
                displayCount={displayCount}
                setDisplayCount={setDisplayCount}
              />
            )}{' '}
          </Box>
        )}
      </Box>
    </Container>
  );
}
