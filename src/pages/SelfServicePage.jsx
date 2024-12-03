// React
import { useState, useEffect, useContext } from 'react';

// router
import { useParams } from 'react-router-dom';

// API
import { fetchCommunity, fetchPractitionersByFilters, fetchOptionsFromAirtable } from '../util/api';

// components
import { Button, CssBaseline, Stack, Container, Typography, Box } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

import FullPageSpinner from '../components/FullPageSpinner';
import PractitionerPane from '../components/PractitionerPane';
import CommunityPane from '../components/CommunityPane';

import { ThemeProvider } from '@mui/material/styles';

// theme
import theme from '../theme';

import { RowHoverContext, SetHoverRowContext } from '../components/RowHoverContext';
import DropDownSelector from '../components/DropDownSelector.jsx';

export default function SelfServicePage() {
  const [selectedOptions, setSelectedOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  const [availableOptions, setAvailableOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  const [practitioners, setPractitioners] = useState([]);
  const [poppedPractitioner, setPoppedPractitioner] = useState(null);
  const [displayCount, setDisplayCount] = useState(3);
  const [hoverRow, setHoverRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const community = {
    name: 'My Community',
    state: selectedOptions.state,
    activities: selectedOptions.activities,
    sectors: selectedOptions.sectors,
    hazards: selectedOptions.hazards,
    size: selectedOptions.size,
    totalCategories: Object.values(selectedOptions).reduce((sum, arr) => sum + arr.length, 0),
  };

  // Get visible practitioners
  const visiblePractitioners = practitioners.slice(0, displayCount);
  const hasMorePractitioners = practitioners.length > displayCount;

  const handleViewMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      await fetchOptionsFromAirtable(setAvailableOptions);
    };

    loadOptions()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleSelectionChange = (category, newSelections) => {
    const updatedOptions = {
      ...selectedOptions,
      [category]: newSelections,
    };
    setSelectedOptions(updatedOptions);

    // Call API with updated selections
    fetchPractitionersByFilters(updatedOptions, setPractitioners);
  };

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading options...</div>;
  }

  if (availableOptions) {
    return (
      <ThemeProvider theme={theme}>
        <RowHoverContext.Provider value={hoverRow}>
          <SetHoverRowContext.Provider value={setHoverRow}>
            <CssBaseline />
            <Container
              maxWidth="xl"
              sx={{ p: 2 }}
            >
              <Stack
                direction="row"
                gap={1}
                sx={{ bgcolor: theme.palette.primary.lightGray }}
              >
                <Box mt={3}>
                  <CommunityPane
                    community={community}
                    isSelectable={true}
                    availableOptions={availableOptions}
                    onSelectionChange={handleSelectionChange}
                  />
                </Box>
                {/* Practitioners */}
                <Stack sx={{ width: '60%', pl: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 1 }}>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      {' '}
                      {/* Center the title */}
                      <Typography
                        color="primary.main"
                        sx={{
                          pt: 1,
                          height: '40px',
                          fontWeight: 700,
                        }}
                        variant="h5"
                      >
                        Matched Practitioners
                      </Typography>
                    </Box>
                    {hasMorePractitioners && (
                      <Box
                        sx={{
                          position: 'fixed',
                          top: '24px',
                          right: '24px',
                          zIndex: 1000,
                        }}
                      >
                        <Button
                          onClick={handleViewMore}
                          variant="contained"
                          sx={{
                            bgcolor: 'primary.white',
                            color: 'primary.main',
                            border: '1px solid',
                            borderColor: 'primary.borderGray',
                            borderRadius: 2,
                            boxShadow: 2,
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: 'primary.lightGray',
                            },
                          }}
                          startIcon={<ReadMoreIcon />}
                        >
                          View more matches
                        </Button>
                      </Box>
                    )}
                  </Box>
                  <Stack
                    direction="row"
                    gap={1}
                    sx={{
                      pb: 2,
                      width: '100%',
                    }}
                  >
                    {visiblePractitioners.map((pract, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: `${100 / 3}%`,
                          minWidth: '250px',
                          flexGrow: 1,
                          flexShrink: 0,
                          flexBasis: 0,
                        }}
                      >
                        <PractitionerPane
                          community={community}
                          practitioner={pract}
                          poppedPractitioner={poppedPractitioner}
                          setPoppedPractitioner={setPoppedPractitioner}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Container>
          </SetHoverRowContext.Provider>
        </RowHoverContext.Provider>
      </ThemeProvider>
    );
  }
}
