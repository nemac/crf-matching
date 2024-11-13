// React
import { useState, useLayoutEffect, useContext } from 'react';

// router
import { useParams } from 'react-router-dom';

// API
import { fetchCommunity, fetchPractitionersForCommunity } from '../util/api';

// components
import { CssBaseline, Stack, Container, Typography, Box } from '@mui/material';

import FullPageSpinner from '../components/FullPageSpinner';
import PractitionerPane from '../components/PractitionerPane';
import CommunityPane from '../components/CommunityPane';

import { ThemeProvider } from "@mui/material/styles";

// theme
import theme from '../theme';

import { RowHoverContext, SetHoverRowContext } from '../components/RowHoverContext';


export default function CommunityPage() {

  const [ community, setCommunity ] = useState(false);
  const [ practitioners, setPractitioners ] = useState([]);

  // Profile info popup
  const [ poppedPractitioner, setPoppedPractitioner ] = useState(null);

  // Tracking the row where mouse hovers
  const [ hoverRow, setHoverRow ] = useState(null);

  const { communityId } = useParams();

  useLayoutEffect(() => {
    fetchPractitionersForCommunity(communityId, setPractitioners);
    fetchCommunity(communityId, setCommunity);
  }, [])

  if (community && practitioners.length) {

    const practitionerPanes = practitioners.map((pract, index) => {
      return <PractitionerPane
        community={ community }
        practitioner={ pract }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
        key={ index }
        style={{
          flex: 1
        }}
      ></PractitionerPane>
    })

    return (
      <ThemeProvider theme={theme}>
        <RowHoverContext.Provider value={hoverRow}>
          <SetHoverRowContext.Provider value={setHoverRow}>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ p: 2 }} >
              <Stack
                direction='row'
                gap={1}
                ml={1}
                sx={{
                  bgcolor: theme.palette.primary.lightGray,
                }}
              >
                <CommunityPane
                  community={ community }
                />

                { /* Practitioners */ }

                <Stack sx={{ width: '60%' }}>
                  <Typography
                    color="primary.main"
                    sx={{
                      pt: 1,
                      height: '40px',
                      textAlign: 'center',
                      fontWeight: 700,
                    }}
                    variant="h5"
                  >
                    <Box
                      sx={{
                        display: {
                          xs: 'none',
                          md: 'inline-block',
                        },
                      }}
                    >Matched</Box> Practitioners
                  </Typography>
                  <Stack
                    direction='row'
                    gap={1}
                    mr={1}
                  >
                    { practitionerPanes }
                  </Stack>
                </Stack>
              </Stack>
            </Container>
          </SetHoverRowContext.Provider>
        </RowHoverContext.Provider>
      </ThemeProvider>
    )
  } else {
    return (
      <FullPageSpinner></FullPageSpinner>
    )
  }

}
