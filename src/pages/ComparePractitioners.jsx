import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Container,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import AddPractitionerModal from '../components/AddPractitionerModal.jsx';
import PractitionerPane from '../components/PractitionerPane.jsx';
import CommunityPane from '../components/CommunityPane.jsx';
import {
  RowHoverContext,
  SetHoverRowContext,
} from '../components/RowHoverContext.js';
import { fetchOptionsFromAirtable, fetchPractitioner } from '../util/api.js';
import theme from '../theme.jsx';

function AddPractitionerColumn(props) {
  const { onClick, isEmpty } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isEmpty ? 'center' : 'flex-start',
        alignItems: 'center',
        padding: isEmpty ? '48px 8px' : '24px 8px',
        gap: '10px',
        width: isEmpty ? 271 : undefined,
        minWidth: isEmpty ? 271 : 200,
        flex: isEmpty ? 'none' : '1 1 0',
        bgcolor: '#E5E7EB',
        border: '1px dashed #003366',
        alignSelf: 'stretch',
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#101828',
          textAlign: 'center',
        }}
      >
        Add Practitioner
      </Typography>
      {!isEmpty && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'text.secondary',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Select Another Practitioner
        </Typography>
      )}
      <IconButton
        onClick={onClick}
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #D1D5DB',
          width: 48,
          height: 48,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            bgcolor: 'primary.sectionBg',
          },
        }}
      >
        <AddIcon sx={{ color: 'primary.ctaDarkBlue', fontSize: 24 }} />
      </IconButton>
    </Box>
  );
}

export default function ComparePractitioners() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPractitioners, setSelectedPractitioners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [poppedPractitioner, setPoppedPractitioner] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [availableOptions, setAvailableOptions] = useState({
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
    state: [],
  });

  useEffect(() => {
    fetchOptionsFromAirtable(setAvailableOptions);
  }, []);

  useEffect(() => {
    const practitionerIds = searchParams.get('practitioners');
    if (!practitionerIds) {
      setInitialLoadComplete(true);
      return;
    }

    const ids = practitionerIds.split(',').filter(Boolean);
    if (ids.length === 0) {
      setInitialLoadComplete(true);
      return;
    }

    let loaded = 0;
    const results = [];
    ids.forEach((id) => {
      fetchPractitioner(id, (practitioner) => {
        if (practitioner) {
          results.push(practitioner);
        }
        loaded++;
        if (loaded === ids.length) {
          const ordered = ids
            .map((id) => results.find((p) => p.airtableRecId === id))
            .filter(Boolean);
          setSelectedPractitioners(ordered);
          setInitialLoadComplete(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!initialLoadComplete) return;

    const ids = selectedPractitioners.map((p) => p.airtableRecId);
    if (ids.length > 0) {
      setSearchParams({ practitioners: ids.join(',') }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [selectedPractitioners, initialLoadComplete]);

  const handleAddPractitioners = (practitioners) => {
    setSelectedPractitioners((prev) => [...prev, ...practitioners]);
  };

  const handleRemovePractitioner = (practitionerId) => {
    setSelectedPractitioners((prev) =>
      prev.filter((p) => p.airtableRecId !== practitionerId)
    );
  };

  const existingIds = selectedPractitioners.map((p) => p.airtableRecId);

  const community = {
    name: 'Compare',
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
    totalCategories: 0,
  };

  return (
    <>
      <NavBar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 6,
          gap: 1,
          width: '100%',
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '36px',
              lineHeight: '44px',
              color: '#101828',
            }}
          >
            Compare Adaptation Practitioners
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: 'text.secondary',
              mt: 1,
            }}
          >
            Side-by-side comparison of selected adaptation practitioners
          </Typography>
        </Box>
      </Box>

      {selectedPractitioners.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: 3,
            pt: 2,
            mb: 8,
          }}
        >
          <AddPractitionerColumn
            onClick={() => setModalOpen(true)}
            isEmpty
          />
        </Box>
      ) : (
        <ThemeProvider theme={theme}>
          <RowHoverContext.Provider value={hoverRow}>
            <SetHoverRowContext.Provider value={setHoverRow}>
              <Container
                maxWidth="xl"
                sx={{ p: 0, cursor: 'default' }}
              >
                <Stack
                  direction="row"
                  sx={{
                    bgcolor: '#FFFFFF',
                    gap: { xs: 0, md: 0 },
                  }}
                >
                  <Box sx={{ flex: '1 1 250px' }}>
                    <CommunityPane
                      community={community}
                      availableOptions={availableOptions}
                      showHeader={false}
                      headerSpacerHeight={187}
                    />
                  </Box>

                  <Stack
                    direction="row"
                    sx={{
                      flex: '3 2 auto',
                      overflowX: 'auto',
                      gap: { xs: '4px', md: 1 },
                    }}
                  >
                    {selectedPractitioners.map((pract) => (
                      <Box
                        key={pract.airtableRecId}
                        sx={{
                          flex: '1 1 0',
                          minWidth: { xs: 50, md: 175 },
                          bgcolor: '#FFFFFF',
                          border: '1px solid #F0F8FF',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: '#FFFFFF',
                            pt: 3,
                            pb: 2,
                            px: 1,
                            gap: 1.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Roboto',
                              fontWeight: 500,
                              fontSize: '20px',
                              lineHeight: '23px',
                              color: '#101828',
                              textAlign: 'center',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              height: 69,
                            }}
                          >
                            {pract.org}
                          </Typography>

                          <Box
                            component="a"
                            href={`/practitioner/${pract.airtableRecId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              textDecoration: 'none',
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Roboto',
                                fontWeight: 500,
                                fontSize: '16px',
                                lineHeight: '19px',
                                color: 'primary.linkBlue',
                              }}
                            >
                              View Full Profile
                            </Typography>
                            <ArrowForwardIcon
                              sx={{ fontSize: 18, color: 'primary.linkBlue' }}
                            />
                          </Box>

                          <Button
                            startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
                            onClick={() =>
                              handleRemovePractitioner(pract.airtableRecId)
                            }
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '8px 24px',
                              gap: '12px',
                              width: 128,
                              height: 35,
                              bgcolor: '#E5E7EB',
                              border: '1px solid #AEAFB3',
                              borderRadius: '8px',
                              textTransform: 'none',
                              color: '#374151',
                              fontWeight: 500,
                              fontSize: '14px',
                              '&:hover': {
                                bgcolor: '#D1D5DB',
                                border: '1px solid #9CA3AF',
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Box>

                        <PractitionerPane
                          community={community}
                          practitioner={pract}
                          poppedPractitioner={poppedPractitioner}
                          setPoppedPractitioner={setPoppedPractitioner}
                          availableOptions={availableOptions}
                          showHeader={false}
                        />
                      </Box>
                    ))}

                    <AddPractitionerColumn
                      onClick={() => setModalOpen(true)}
                    />
                  </Stack>
                </Stack>
              </Container>
            </SetHoverRowContext.Provider>
          </RowHoverContext.Provider>
        </ThemeProvider>
      )}

      <Footer />

      <AddPractitionerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddPractitioners={handleAddPractitioners}
        existingPractitionerIds={existingIds}
      />
    </>
  );
}
