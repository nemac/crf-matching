import { Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import IncludedInRegistry from '../components/IncludedInRegistry.jsx';
import ContactUs from '../components/ContactUs.jsx';
import applicationDoc from '../assets/Registry-Application-Questions_Mar2026.docx';

export default function HowToApplyPage() {
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
              sx={{
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '23px',
                textAlign: 'center',
                color: '#0066CC',
                textTransform: 'uppercase',
              }}
            >
              HOW TO APPLY
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
              sx={{
                fontWeight: 700,
                fontSize: { xs: '32px', md: '48px' },
                lineHeight: { xs: '40px', md: '56px' },
                textAlign: 'center',
                color: '#2D3F5D',
              }}
            >
              Join the Registry of Adaptation Practitioners
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
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '21px',
                textAlign: 'center',
                color: '#56657D',
              }}
            >
              Help communities build resilience to climate change by joining the
              Registry as a vetted service provider
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: 3,
            bgcolor: '#F9FAFB',
            border: '1px solid #E1F5FE',
            borderRadius: '6px',
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', py: 1, gap: 0.5 }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '28px',
                color: '#101828',
                py: 0.5,
              }}
            >
              Eligibility Requirements
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '21px',
                color: '#101828',
                py: 0.5,
              }}
            >
              The Registry is open to all organizations that provide climate
              adaptation and resilience services to communities and free to
              join. To ensure the quality and integrity of the Registry,
              applicant organizations must meet the following criteria:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <CheckCircleOutlineIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Applications must be on behalf of an organization
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#101828',
                  }}
                >
                  Applications should be submitted on behalf of nonprofit
                  organizations, governmental entities, academic institutions,
                  consulting firms, or sole proprietorships that offer
                  adaptation services.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <CheckCircleOutlineIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Demonstrated Experience
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#101828',
                  }}
                >
                  Organizations must have at least three years of professional
                  experience providing adaptation services, and must submit 2-3
                  project examples demonstrating those services and the quality
                  of their work.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <CheckCircleOutlineIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Terms and Conditions
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '21px',
                      color: '#101828',
                    }}
                  >
                    Applicants must commit to upholding professional standards
                    and the Registry
                  </Typography>
                  <Typography
                    component="a"
                    href="https://climatesmartcommunity.org/registry/registry-terms-conditions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '19px',
                      color: '#0066CC',
                      textDecoration: 'underline',
                    }}
                  >
                    Terms and Conditions
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: 3,
            bgcolor: '#E1F5FE',
            border: '1px solid #003366',
            borderRadius: '6px',
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', py: 1, gap: 0.5 }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '28px',
                color: '#101828',
                py: 0.5,
              }}
            >
              Application Process and Timeline
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '21px',
                color: '#101828',
                py: 0.5,
              }}
            >
              The application process is designed to be straightforward and
              transparent:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <LooksOneOutlinedIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Preview the application questions
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#101828',
                  }}
                >
                  Application questions can be downloaded in this{' '}
                  <Typography
                    component="a"
                    href={applicationDoc}
                    download
                    sx={{
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '19px',
                      color: '#101828',
                      textDecoration: 'underline',
                    }}
                  >
                    Word document
                  </Typography>
                  , which organizations can use to collect required information
                  and draft their answers.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <LooksTwoOutlinedIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Submit the application
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#101828',
                  }}
                >
                  Submit the application through our online form (note that
                  progress is not automatically saved in the application form,
                  so we recommend drafting your answers in this{' '}
                  <Typography
                    component="a"
                    href={applicationDoc}
                    download
                    sx={{
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '19px',
                      color: '#101828',
                      textDecoration: 'underline',
                    }}
                  >
                    Word document
                  </Typography>{' '}
                  before submitting).
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <Looks3OutlinedIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Review Period
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#101828',
                  }}
                >
                  Applications are reviewed on a rolling basis, and the Registry
                  team will contact applicants with a decision or to request
                  additional information. All applicants will be contacted
                  within two months of submission.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <Looks4OutlinedIcon
                sx={{ color: '#0066CC', fontSize: 48, flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '23px',
                    color: '#101828',
                  }}
                >
                  Notification and Listing
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#101828',
                  }}
                >
                  The primary organization contact listed in the application
                  will be notified of the decision within two months of
                  submission. Reviews may take longer if additional information
                  is required or during busy periods. Approved organizations
                  will be listed in the Registry shortly thereafter.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 6, bgcolor: '#FFFFFF' }}>
        <IncludedInRegistry />
      </Box>

      <Box sx={{ px: { xs: 4, sm: 6, md: 12 }, py: 6, bgcolor: '#FFFFFF' }}>
        <ContactUs />
      </Box>
    </ThemeProvider>
  );
}
