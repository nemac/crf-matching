import { Typography, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
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
          py: 4,
          px: { xs: 2, sm: 4, md: 12 },
          bgcolor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
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
              HOW TO APPLY
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
              }}
            >
              Join the Registry of Adaptation Practitioners
            </Typography>
          </Box>


        <Box sx={{ 
                    mb: 8,
                    p:4,
                    mx:{ xs: 4, sm: 4, md: 10, lg: 20 },
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor: '#E1F5FE',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.primary.midBlue}`,        
                  }}>
          <Typography
            variant="h3"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Announcement 
          </Typography>

          <Box sx={{ width: `100%`, alignContent: 'center', justifyContent: 'center'}}>
            <Typography component="div" sx={{ py:2, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
              Due to an extremely high volume of applicants, the Registry of Adaptation Practitioners is temporarily closed to new applications.
            </Typography>
            <Typography component="div" sx={{ py:2, width: '100%', textAlign: 'center'}}>
                We anticipate reopening the application portal in late March 2026.
            </Typography>
            <Typography component="div" sx={{ width: '100%', textAlign: 'center'}}>
                We appreciate your patience and encourage you to check back at that time.
            </Typography>
          </Box>
        </Box>


        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              opacity: 0.9,
            }}
          >
            <Typography variant="subtitle1" component="div">
              Help communities adapt to climate change by joining the Registry
              as a vetted service provider
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1,
            gap: 0.5,
            mb: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{ py: 0.5 }}
          >
            Is your organization a good fit for the Registry?
          </Typography>
          <Typography component="div" variant="body1">
            The Registry is designed to connect climate adaptation service
            providers and communities who need support with adaptation. An
            adaptation service provider is an organization that focuses on
            helping communities prepare for the impacts of climate change
            (note that reducing greenhouse gas emissions is an important
            component of climate action, but not a focus of this Registry!).
            Some of the defining characteristics of adaptation service
            providers who should be included in this Registry include:
          </Typography>

          <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
              }}>
          {[
            'Experience assisting communities with planning efforts and projects specifically designed to proactively address local impacts of climate change',
            'Ability to skillfully incorporate climate change considerations into projects and processes;',
            'Understanding of climate data and projections, including when and how to utilize them, as well as how to communicate about it to community leaders and residents; and',
            'Ability to engage whole communities and ensure adaptation projects center equity;',
            'Willing to be contacted by communities looking for support with adaptation needs;',
          ].map(item => (
            <Box
              key={item}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                py: .25,
                px: 2,
                gap: 2,
              }}
            >
              <FiberManualRecordIcon
                sx={{ color: 'primary.ctaDarkBlue', fontSize: 12, flexShrink: 0 }}
              />
              <Typography component="div" variant="body1">
                {item}
              </Typography>
            </Box>
          ))}
          </Box>

          <Box sx={{ py: 1 }}>
            <Typography component="div" variant="body">
              All organizations in the Registry, regardless of the type of
              services that they provide, must demonstrate that they are
              sought out for the adaptation expertise that they provide. They
              must also show that the services they offer are intentional
              about incorporating consideration of climate impacts and
              proactively addressing them, rather than simple acknowledgement
              that work focused on other topics or community needs also
              happens to have adaptation benefits.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: 1,
            bgcolor: 'primary.sectionBg',
            border: '1px solid #E1F5FE',
            borderRadius: 2,
            isolation: 'isolate',
          }}
        >
          <Box sx={{ p: 1, gap: 1.5 }}>
            <Box sx={{ py: 1 }}>
              <Typography component="div" variant="body1">
                The Registry is categorized into two groups of adaptation
                service providers:
              </Typography>
            </Box>

            <Box
              sx={{ px: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Box sx={{ py: 1, gap: 0.5 }}>
                <Typography
                  variant="h4"
                  sx={{ py: 0.5 }}
                >
                  Broad service providers
                </Typography>
                <Typography component="div" variant="body1">
                  Broad service providers have wide-ranging adaptation
                  expertise, supporting community efforts to undertake
                  cross-sector climate change vulnerability assessments, develop
                  adaptation plans, and plan or implement actions focused on
                  reducing their vulnerability to climate change impacts.
                </Typography>
              </Box>

              <Box sx={{ py: 1, gap: 0.5 }}>
                <Typography
                  variant="h4"
                  sx={{ py: 0.5 }}
                >
                  Specialists
                </Typography>
                <Typography component="div" variant="body1">
                  Specialists are organizations that focus more narrowly on one
                  or more specific climate hazards, topics, or sectors,
                  supporting communities in planning through implementation of
                  adaptation-focused actions within a specific category (e.g.,
                  wildfire resilience, public health, spatial analysis,
                  ecosystem restoration, insurance systems).
                </Typography>
              </Box>
            </Box>

            <Box sx={{ pb: 1 }}>
              <Typography component="div" variant="body1">
                Approved practitioners will be categorized as broad service
                practitioners or specialists based on the best judgement of the
                review team.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            bgcolor: 'primary.sectionBg',
            border: '1px solid #E1F5FE',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', py: 1, }}
          >
            <Typography
                  variant="h3"
                  sx={{ py: 0.5 }}
            >
              Eligibility Requirements
            </Typography>
            <Typography component="div" variant="body1">
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
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Applications must be on behalf of an organization
                </Typography>
                <Typography component="div" variant="body1">
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
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Demonstrated Experience
                </Typography>
                <Typography component="div" variant="body1">
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
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Terms and Conditions
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography component="div" variant="body1">
                    Applicants must commit to upholding professional standards
                    and the Registry
                  </Typography>
                  <Typography
                    component="a"
                    variant="body1"
                    href="https://climatesmartcommunity.org/registry/registry-terms-conditions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.linkBlue',
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

      <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            bgcolor: '#E1F5FE',
            border: '1px solid #003366',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'column', py: 1, }}
          >
            <Typography
              variant="h3"
            >
              Application Process and Timeline
            </Typography>
            <Typography component="div" variant="body1">
              The application process is designed to be straightforward and
              transparent:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', p: 1, gap: 3 }}
            >
              <LooksOneOutlinedIcon
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Preview the application questions
                </Typography>
                <Typography component="div" variant="body1">
                  Application questions can be downloaded in this{' '}
                  <Typography
                    component="a"
                    variant="body1"
                    href={applicationDoc}
                    download
                    sx={{
                      fontWeight: 'bold',
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
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Submit the application
                </Typography>
                <Typography component="div" variant="body1">
                  Submit the application through our online form (note that
                  progress is not automatically saved in the application form,
                  so we recommend drafting your answers in this{' '}
                  <Typography
                    component="a"
                    variant="body1"
                    href={applicationDoc}
                    download
                    sx={{
                      fontWeight: 'bold',
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
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Review Period
                </Typography>
                <Typography component="div" variant="body1">
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
                sx={{ color: 'primary.linkBlue', fontSize: '28px', flexShrink: 0 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="h5">
                  Notification and Listing
                </Typography>
                <Typography component="div" variant="body1">
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

      <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <IncludedInRegistry />
      </Box>

      <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: 4, bgcolor: '#FFFFFF' }}>
        <ContactUs />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
