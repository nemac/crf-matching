import { useState } from 'react';
import { CssBaseline, Stack, Container, Typography, Box, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { ThemeProvider } from '@mui/material/styles';

import PractitionerPane from './PractitionerPane';
import CommunityPane from './CommunityPane';
import theme from '../theme';
import { RowHoverContext, SetHoverRowContext } from './RowHoverContext';

export default function ComparisonBoard({
  community,
  practitioners,
  isSelectable = false,
  availableOptions = {},
  onSelectionChange = () => {},
  displayCount = 3,
  setDisplayCount = () => {},
}) {
  const [poppedPractitioner, setPoppedPractitioner] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);

  // Get visible practitioners
  const visiblePractitioners = practitioners.slice(0, displayCount);
  const hasMorePractitioners = practitioners.length > displayCount;

  const handleViewMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  return (
    <ThemeProvider theme={theme}>
      <RowHoverContext.Provider value={hoverRow}>
        <SetHoverRowContext.Provider value={setHoverRow}>
          <Container
            maxWidth="xl"
            sx={{ p: 0 }}
          >
            <Stack
              direction="row"
              sx={{ bgcolor: theme.palette.primary.lightGray, gap: { xs: 0, md: 1 }}}
            >
              {/* Community Panel */}
              <Box
                mt={3}
                sx={{ flex: '1 1 250px;' }}
              >
                <CommunityPane
                  community={community}
                  isSelectable={isSelectable}
                  availableOptions={availableOptions}
                  onSelectionChange={onSelectionChange}
                />
              </Box>

              {/* Practitioners Panel */}
              <Stack sx={{ width: '60%', pl: 0, flex: '3 2 auto' }}>
                {/* Header Area with View More Button */}
                <Box sx={{ mb: 2, mt: 1, position: 'relative' }}>
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
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
                        position: 'absolute',
                        top: {
                          xs: '70px',
                          sm: '40px',
                          lg: '8px',
                        },
                        right: '8px',
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

                {/* Practitioners List */}
                <Stack
                  direction="row"
                  sx={{
                    pb: 2,
                    width: '100%',
                    gap: {
                      xs: '4px',
                      md: 1,
                    },
                    overflowX: 'auto',
                  }}
                >
                  {visiblePractitioners.map((pract, index) => (
                    <Box
                      key={index}
                      sx={{ flex: '1 1 0' }}
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
