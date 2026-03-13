import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import NavBar from '../components/NavBar.jsx';
import { fetchTotalPractitionerCount } from '../util/api.js';
import { useEffect, useState } from 'react';
import AltActionButton from '../components/baseComponents/AltActionButton.jsx';
import CallToActionButton from '../components/baseComponents/CallToActionButton.jsx';
import searchbar_background from '../assets/searchbar_background.png';

export default function HomePage() {
  const [totalPractitioners, setTotalPractitioners] = useState(0);

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
  }, []);

  return (
    <>
      <NavBar />
      <Container disableGutters maxWidth={false}>
        <Stack direction="column" spacing={8} sx={{ mt: 4 }}>
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
                filter: 'blur(1px)', // adjust blur amount
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
              <Box>
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 48,
                  }}
                >
                  Registry of Adaptation Practitioners
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontWeight: 400,
                    fontSize: 18,
                  }}
                >
                  Connect with vetted experts to build resilience in your
                  community or organization.
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#FFFFFF99',
                    width: '100%',
                    minHeight: 84,
                    borderRadius: 3,
                  }}
                >
                  <Box>Search bar</Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/*this is where the search bar ends and the browse all start */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 500,
              }}
            >
              Browse all{' '}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  fontSize: '24px',
                  color: '#003366',
                }}
              >
                {totalPractitioners}
              </Box>{' '}
              practitioners section
            </Typography>
            {/* Mid below */}
            <Typography sx={{ p: '10px' }}>
              A simple, streamlined process to connect you with the expertise
              you need.
            </Typography>
            {/* Button below should be changed once the main practitioners page is done */}
            <AltActionButton
              to="/ComparePractitioners"
              text="Browse all Practitioners"
              textSx={{
                fontWeight: 400,
                fontSize: '14px',
                color: '#2D3F5D',
              }}
            />
          </Box>
          {/* How registry works */}
          <Box
            sx={{
              minHeight: '418px',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                height: '80%',
                width: '80%',
                backgroundColor: '#F9FAFB',
                border: '2px solid',
                borderColor: '#E1F5FE',
                borderRadius: 2,
                color: '#F9FAFB',
              }}
            >
              {/* This has the two sentences before the 3 boxes */}
              <Typography
                sx={{
                  textAlign: 'center',
                  pt: 3,
                  fontWeight: 700,
                  fontSize: '24px',
                  color: '#101828',
                }}
              >
                How the Registry Works
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  fontWeight: 400,
                  fontSize: '18px',
                  color: '#56657D',
                  pb: { xs: 4, md: 10 },
                }}
              >
                A simple, streamlined process to connect you with the expertise
                you need.
              </Typography>
              {/* Nested boxes will hold the 3 boxes within the how registry works */}
              <Grid container spacing={2}>
                {/* Begin first box */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        display: 'flex',
                        gap: '18px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#003366',
                        borderRadius: '50%',
                      }}
                    >
                      {/* Icon to be changed to image from figma */}
                      <SearchIcon
                        sx={{
                          color: '#FFFFFF',
                          fontSize: 30,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        fontSize: 20,
                        color: '#101828',
                      }}
                    >
                      Search and Filter
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: '#56657D',
                        textAlign: 'center',
                      }}
                    >
                      Use our guided search to find practitioners
                      <br />
                      with the right expertise and focus for your
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontWeight: 400,
                          fontSize: 16,
                          color: '#56657D',
                        }}
                      >
                        needs.
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                {/* End first feature box, begin second */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        display: 'flex',
                        gap: '18px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#003366',
                        borderRadius: '50%',
                      }}
                    >
                      {/* Icon to be changed to image from figma */}
                      <PeopleOutlineOutlinedIcon
                        sx={{
                          color: '#FFFFFF',
                          fontSize: 30,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        fontSize: 20,
                        color: '#101828',
                      }}
                    >
                      Review Profiles
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: '#56657D',
                        textAlign: 'center',
                      }}
                    >
                      Explore detailed profiles, including
                      <br />
                      specailizations, community focus and work
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontWeight: 400,
                          fontSize: 16,
                          color: '#56657D',
                        }}
                      >
                        examples
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                {/*End second feature begin third*/}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        display: 'flex',
                        gap: '18px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#003366',
                        borderRadius: '50%',
                      }}
                    >
                      {/* Icon to be changed to image from figma */}
                      <HandshakeOutlinedIcon
                        sx={{
                          color: '#FFFFFF',
                          fontSize: 30,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 500,
                        fontSize: 20,
                        color: '#101828',
                      }}
                    >
                      Connect & Collaborate
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: '#56657D',
                        textAlign: 'center',
                      }}
                    >
                      Contact practitioners directly to discuss
                      <br />
                      your project and build a resilient future
                      <Typography
                        sx={{
                          textAlign: 'center',
                          fontWeight: 400,
                          fontSize: 16,
                          color: '#56657D',
                        }}
                      >
                        together.
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                {/*end third feature*/}
              </Grid>
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
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 18,
                  color: '#56657D',
                  p: 4,
                }}
              >
                The Registry includes two categories of practitioners
              </Typography>
              <Box sx={{ minHeight: 156, gap: 24 }}>
                <Grid container>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ minHeight: 140 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 24,
                        }}
                      >
                        Broad service providers
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: 16,
                          color: '#56657D',
                          p: 1,
                        }}
                      >
                        Practitioners that are generalists, supporting
                        <br />
                        communities or other groups with adaptation projects
                        <br />
                        and programs across a wide range of topics/sectors,
                        <br />
                        climate impacts, type of project, etc
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 24,
                        }}
                      >
                        Specialists
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: 16,
                          color: '#56657D',
                        }}
                      >
                        Practitioners that provide a specific, specialized
                        skillset
                        <br />
                        or service, or who focus on a narrow range of topics or
                        <br />
                        sectors (e.g., energy efficiency, insurance systems).
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
              height: 136,
              pt: 8,
              pb: 8,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                fontSize: 20,
                color: '#56657D',
              }}
            >
              How to apply
            </Typography>
            <Typography
              sx={{
                p: 2,
                fontWeight: 400,
                fontSize: 16,
                color: '#56657D',
                textAlign: 'center',
              }}
            >
              Be recognized as an expert helping communities build a more
              resilient future!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
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
    </>
  );
}
