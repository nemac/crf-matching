import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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
import SearchBar from '../components/baseComponents/SearchBar.jsx';
import PullDownFilter from '../components/baseComponents/PulldownFilter.jsx';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [filters, setFilters] = useState({
    community: '',
    activities: [],
    sectors: [],
    hazards: [],
  });
  const [availableOptions, setAvailableOptions] = useState({
    activities: [],
    sectors: [],
    hazards: [],
  });

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
    fetchOptionsFromAirtable(setAvailableOptions);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Container disableGutters maxWidth={false}>
        <Stack direction="column" spacing={8}>
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
              <Box>
                {/* main text of search bar */}
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
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* searching fields */}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <SearchBar
                      text="Enter the community"
                      onChange={e =>
                        setFilters(prev => ({
                          ...prev,
                          community: e.target.value,
                        }))
                      }
                    />
                    <PullDownFilter
                      filterName="services filter"
                      filterText="Services"
                      availableOptions={availableOptions.activities}
                      selectedValues={filters.activities}
                      onChange={e =>
                        setFilters(prev => ({
                          ...prev,
                          activities: e.target.value,
                        }))
                      }
                    />
                    <PullDownFilter
                      filterName="Hazards filter"
                      filterText="Hazards"
                      availableOptions={availableOptions.hazards}
                      selectedValues={filters.hazards}
                      onChange={e =>
                        setFilters(prev => ({
                          ...prev,
                          hazards: e.target.value,
                        }))
                      }
                    />
                    <PullDownFilter
                      filterName="Sectors filter"
                      filterText="Sectors"
                      availableOptions={availableOptions.sectors}
                      selectedValues={filters.sectors}
                      onChange={e =>
                        setFilters(prev => ({
                          ...prev,
                          sectors: e.target.value,
                        }))
                      }
                    />
                    <CallToActionButton
                      buttonSx={{
                        borderRadius: 12,
                        height: 34,
                      }}
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (filters.community)
                          params.set('community', filters.community);
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
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                      text="Find Practitioners"
                    />
                  </Box>
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
                  color: 'primary.ctaDarkBlue',
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
                color: 'primary.main',
              }}
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
                padding: '24px',
                gap: '48px',
                backgroundColor: 'primary.sectionBg',
                border: '2px solid #E1F5FE',
                borderRadius: '8px',
                alignSelf: 'stretch',
                width: '100%',
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
                    alignSelf: 'stretch',
                    p: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 700,
                      fontSize: '24px',
                      lineHeight: '28px',
                      textAlign: 'center',
                      color: '#101828',
                    }}
                  >
                    How the Registry Works
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    p: '10px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '21px',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    A simple, streamlined process to connect you with the
                    expertise you need.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '56px',
                  py: 0.5,
                }}
              >
                <FeatureCard
                  icon={<SearchIcon sx={{ color: '#FFFFFF', fontSize: 32 }} />}
                  title="Search and Filter"
                  description="Use our guided search to find practitioners with the right expertise and focus for your needs."
                />
                <FeatureCard
                  icon={
                    <PeopleOutlineOutlinedIcon
                      sx={{ color: '#FFFFFF', fontSize: 32 }}
                    />
                  }
                  title="Review Profiles"
                  description="Explore detailed profiles, including specailizations, community focus and work examples."
                />
                <FeatureCard
                  icon={
                    <HandshakeOutlinedIcon
                      sx={{ color: '#FFFFFF', fontSize: 32 }}
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
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 18,
                  color: 'text.secondary',
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
                          color: 'text.secondary',
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
                          color: 'text.secondary',
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
              pt: 8,
              pb: 8,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                fontSize: 20,
                color: 'text.secondary',
              }}
            >
              How to apply
            </Typography>
            <Typography
              sx={{
                p: 2,
                fontWeight: 400,
                fontSize: 16,
                color: 'text.secondary',
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
      <Footer />
    </>
  );
}
