import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import crf_logo from '../assets/CRF_logo.jpg';
import ecoadapt_logo from '../assets/EcoAdapt_logo_cmyk.jpg';
import geos_logo from '../assets/geos_logo.jpg';
import nemac_logo from '../assets/nemac_logo.png';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import IncludedInRegistry from '../components/IncludedInRegistry';
import ContactUs from '../components/ContactUs';

const partners = [
  { name: 'EcoAdapt', imgSrc: ecoadapt_logo, url: 'https://ecoadapt.org' },
  {
    name: 'Climate Resilience Fund',
    imgSrc: crf_logo,
    url: 'https://climateresiliencefund.org',
  },
  {
    name: 'Geos Institute',
    imgSrc: geos_logo,
    url: 'https://geosinstitute.org',
  },
  {
    name: "UNC Asheville's NEMAC",
    imgSrc: nemac_logo,
    url: 'https://nemac.unca.edu',
  },
];

export default function AboutPage() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 6,
          px: { xs: 4, sm: 6, md: 12 },
          bgcolor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            px: { xs: 0, md: 12 },
            gap: 1.5,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="eyebrow"
              sx={{
                textAlign: 'center',
              }}
            >
              About the Registry
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 0, md: 12 },
              width: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
              }}
            >
              Connecting Communities with Climate Adaptation Experts
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 2, sm: 8, md: 30 },
              width: '100%',
              opacity: 0.9,
            }}
          >
            <Typography variant="subtitle1" component="div">
              The Registry of Adaptation Practitioners is a curated directory of
              vetted adaptation service providers designed to help communities
              find the professional assistance they need to build resilience to
              climate change.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 4, sm: 6, md: 12 },
          py: 4,
          bgcolor: '#FFFFFF',
        }}
      >
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  py: 1,
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ py: 0.5 }}
                >
                  For Communities
                </Typography>
                <Typography component="div" variant="body1">
                  The Registry enables communities seeking climate adaptation
                  support services to identify and connect with qualified
                  practitioners whose expertise and focus match their needs, are
                  committed to following best practices, and have a track record
                  of high-quality results.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  py: 1,
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ py: 0.5 }}
                >
                  For Practitioners
                </Typography>
                <Typography component="div" variant="body1">
                  The Registry enables practitioner organizations to showcase
                  their expertise, skills, and experience to community leaders
                  who are actively seeking adaptation assistance. Joining the
                  Registry enhances an organization&apos;s visibility and
                  connects it with meaningful projects that make a real-world
                  impact.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: 1,
                  gap: 1,
                }}
              >
                <Typography component="div" variant="body1">
                  The Registry is categorized into two groups of adaptation service providers:
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    pl: 3,
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      py: 1,
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ py: 0.5 }}
                    >
                      Broad service providers
                    </Typography>
                    <Typography component="div" variant="body1">
                      Broad service providers have wide-ranging adaptation
                      expertise, supporting community efforts to undertake
                      cross-sector climate change vulnerability assessments,
                      develop adaptation plans, and plan or implement actions
                      focused on reducing their vulnerability to climate change
                      impacts.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      py: 1,
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ py: 0.5 }}
                    >
                      Specialists
                    </Typography>
                    <Typography component="div" variant="body1">
                      Specialists are organizations that focus more narrowly on
                      one or more specific climate hazards, topics, or sectors,
                      supporting communities in planning through implementation
                      of adaptation-focused actions within a specific category
                      (e.g., wildfire resilience, public health, spatial
                      analysis, ecosystem restoration, insurance systems).
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                bgcolor: '#E1F5FE',
                border: '1px solid #0066CC',
                borderRadius: '6px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  py: 1,
                  gap: 0.5,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ py: 0.5 }}
                >
                  Application & Review Process
                </Typography>
                <Typography component="div" variant="body1">
                  To be accepted into the Registry, an organization&apos;s
                  application is evaluated to ensure that it possesses the depth
                  of expertise and skill necessary to provide effective,
                  equitable, and sustainable adaptation services to communities,
                  and that its staff adhere to best practices in the field.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 1,
                    gap: 1,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ color: 'primary.linkBlue', fontSize: '24px' }}
                  />
                  <Typography component="div" variant="body1">
                    <strong>Submit Application</strong>: Practitioner
                    organizations complete the online form, detailing their
                    qualifications, experience, and areas of specialization.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 1,
                    gap: 1,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ color: 'primary.linkBlue', fontSize: '24px' }}
                  />
                  <Typography component="div" variant="body1">
                    <strong>Expert Review</strong>: Our panel of seasoned
                    adaptation experts assesses each application against
                    criteria for acceptance.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 1,
                    gap: 1,
                  }}
                >
                  <CheckCircleOutlineIcon
                    sx={{ color: 'primary.linkBlue', fontSize: '24px' }}
                  />
                  <Typography component="div" variant="body1">
                    <strong>Notification and listing</strong>: Applicants are
                    notified of the final decision within two months. Once
                    approved, the organization will be published in the
                    Registry. Registry.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 6,
          px: { xs: 4, sm: 6, md: 12 },
          gap: 1,
          bgcolor: 'primary.sectionBg',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 3,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 0.5,
              width: '100%',
            }}
          >
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: 4,
              width: '100%',
            }}
          >
            <Typography component="div" variant="body1" sx={{ textAlign: 'center' }}>
              The Registry of Adaptation Professionals is made possible by the
              Walton Family Foundation and the Gordon and Betty Moore
              Foundation.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: 4,
              width: '100%',
            }}
          >
            <Typography component="div" variant="body1" sx={{ textAlign: 'center' }}>
              The Registry is a collaborative effort by leading organizations in
              the field of climate adaptation.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              p: 1,
              gap: 2,
              width: '100%',
              opacity: 0.9,
              flexWrap: 'wrap',
            }}
          >
            {partners.map(partner => (
              <Paper
                key={partner.name}
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: '20px 12px',
                  gap: 1,
                  width: { xs: '100%', sm: '45%', md: 288 },
                  height: 165,
                  bgcolor: '#FFFFFF',
                  boxShadow:
                    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                component="a"
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 0.5,
                    width: '100%',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={partner.imgSrc}
                    alt={partner.name}
                    sx={{
                      maxWidth: '100%',
                      maxHeight: 90,
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography component="div" variant="body1" sx={{ fontWeight: 500, textAlign: 'center', width: '100%' }}>
                    {partner.name}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 6, bgcolor: '#FFFFFF' }}>
        <ContactUs />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
