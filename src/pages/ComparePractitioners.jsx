import { useState, useEffect } from 'react';
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
import NavBar from '../components/NavBar.jsx';
import AddPractitionerModal from '../components/AddPractitionerModal.jsx';
import PractitionerPane from '../components/PractitionerPane.jsx';
import CommunityPane from '../components/CommunityPane.jsx';
import {
  RowHoverContext,
  SetHoverRowContext,
} from '../components/RowHoverContext.js';
import { fetchOptionsFromAirtable } from '../util/api.js';
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
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#56657D',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        Select Another Practitioner
      </Typography>
      <IconButton
        onClick={onClick}
        sx={{
          bgcolor: '#FFFFFF',
          border: '1px solid #D1D5DB',
          width: 48,
          height: 48,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            bgcolor: '#F9FAFB',
          },
        }}
      >
        <AddIcon sx={{ color: '#003366', fontSize: 24 }} />
      </IconButton>
    </Box>
  );
}

export default function ComparePractitioners() {
  const [selectedPractitioners, setSelectedPractitioners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [poppedPractitioner, setPoppedPractitioner] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);
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
              color: '#56657D',
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
                    bgcolor: theme.palette.primary.lightGray,
                    gap: { xs: 0, md: 1 },
                  }}
                >
                  <Box mt={3} sx={{ flex: '1 1 250px' }}>
                    <CommunityPane
                      community={community}
                      availableOptions={availableOptions}
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
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 10,
                          }}
                        >
                          <Button
                            size="small"
                            startIcon={<CloseIcon sx={{ fontSize: 14 }} />}
                            onClick={() =>
                              handleRemovePractitioner(pract.airtableRecId)
                            }
                            sx={{
                              textTransform: 'none',
                              bgcolor: '#FFFFFF',
                              borderColor: '#D1D5DB',
                              border: '1px solid #D1D5DB',
                              color: '#374151',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                              minWidth: 'auto',
                              '&:hover': {
                                borderColor: '#9CA3AF',
                                bgcolor: '#F9FAFB',
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

      <AddPractitionerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddPractitioners={handleAddPractitioners}
        existingPractitionerIds={existingIds}
      />
    </>
  );
}
