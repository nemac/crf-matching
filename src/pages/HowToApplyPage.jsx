import { Container, Typography, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';

export default function HowToApplyPage() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{ 
          pt: 4,
          pb: 8,
          cursor: 'default',
          px: { xs: 4, sm: 4, md: 4, lg: 3 },
        }}
      >
        {/* Main Title Section */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 4,
            mt: 4,
          }}
        >
          How to Apply
        </Typography>

        {/* Registration Section */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Want to be included in the Registry? 
          </Typography>

          <Box sx={{ 
            width: `100%`,
            
          }}>

            <Typography
              variant="body1"
              paragraph
            >
              If your organization provides services in the field of climate resilience and adaptation, 
              is committed to following best practices, and has a track record of high-quality results,&nbsp;
              <a
                href="https://www.surveymonkey.com/r/adaptation-registry"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}
              >
                submit an application
              </a>
              ! We are especially interested in organizations that support entire community adaptation processes, including stakeholder 
              engagement, vulnerability assessment, adaptation planning, and plan implementation.
            </Typography>
          </Box>
        </Box>


        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          mb: 8,
        }}>
          <Button
              variant="contained"
              href="https://www.surveymonkey.com/r/adaptation-registry"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.white',
                textTransform: 'none',
                px: 4,
                py: 1,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Submit an application
          </Button>
        </Box>


        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Eligibility Requirements 
          </Typography>

          <Box sx={{ 
            width: `100%`,
            
          }}>

            <Typography component="ul"  sx={{ mt: 1, mb: 2, ml: 2, mr: 2}}>
                <li>
                    Applications should be submitted on behalf of an organization, used here to refer to any nonprofit organization, 
                    governmental entity, academic institution, consulting firm, or sole proprietorship that offers 
                    adaptation and/or resilience services. (Please note that a group, division, or chapter of a larger entity 
                    may apply as a “team” rather than as the whole organization.)
                </li>
                <li>
                  At a minimum, applying organizations must have at least three years of experience in the field or two years 
                  of experience plus one or more staff members width
                  &nbsp;
                  <a 
                    href='https://climatesmartcommunity.org/hello-world/'
                    target='_blank'
                    rel="noopener noreferrer"
                    style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                      specialized training
                  </a>
                  &nbsp;
                  (e.g., NOAA’s Steps to Resilience training).
                </li>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            Application Process & Timeline
          </Typography>

          <Box sx={{ 
            width: `100%`,
            
          }}>

            <Typography component="ul"  sx={{ mt: 1, mb: 2, ml: 2, mr: 2}}>
                <li>
                   Application responses can be drafted in this
                    &nbsp;
                    <a 
                      href='https://climatesmartcommunity.org/wp-content/uploads/2024/12/Adaptation-Registry_Application-Questions_Dec2024.docx'
                      target='_blank'
                      rel="noopener noreferrer"
                      style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                        downloadable document (Word).
                    </a>
                    &nbsp;
                    Please note that progress is not automatically saved in the online application form, so we recommend working in this document before submitting.

                </li>
                <li>
                  recommend working in this document before submitting.
                  Review: All applications will be reviewed within two months of submission. Any questions 
                  about the status of a submission or the process can be sent to
                  &nbsp;
                  <a 
                    href='mailto:info@adaptationregistry.org'
                    style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                      info@adaptationregistry.org
                  </a>
                </li>
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 1 }}>
          <Typography variant='description' >
                Have additional questions about applying to the Registry? Email
                &nbsp;
                <a 
                  href='mailto:info@adaptationregistry.org'
                  style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                    info@adaptationregistry.org
                </a>
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant='description' >
                Read the full set of terms and conditions related to the Registry of Adaptation Practitioners
                &nbsp;
                <a 
                  href='https://climatesmartcommunity.org/registry-terms-conditions/'
                  target='_blank'
                  rel="noopener noreferrer"
                  style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
                    here
                </a>
                .
          </Typography>
        </Box>

      </Container>
    </ThemeProvider>
  );
}
