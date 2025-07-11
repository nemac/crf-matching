import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import crf_logo from '../assets/CRF_logo.jpg';
import ecoadapt_logo from '../assets/EcoAdapt_logo_cmyk.jpg';
import geos_logo from '../assets/geos_logo.jpg';
import nemac_logo from '../assets/nemac_logo.png';
import NavBar from '../components/NavBar';

const PartnerLogo = ({ name, imgSrc, url }) => (
  <Paper
    elevation={2}
    sx={{
      cursor: 'default',
      height: '220px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 2,
      bgcolor: 'primary.white',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
      },
      overflow: 'hidden',
    }}
  >
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          p: 1,
          pb: 2,
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={name}
          sx={{
            maxWidth: '100%',
            maxHeight: '130px',
            objectFit: 'contain',
            opacity: '100%',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'white',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          // variant="h6"
          align="center"
          sx={{
            fontSize: '1.0 rem',
            fontWeight: 'bold',
            color: 'theme.palette.primary.main'
          }}
        >
          {name}
        </Typography>
      </Box>
    </a>
  </Paper>
);

export default function AboutPage() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />    
      <Container
        maxWidth="xl"
        sx={{ pt: 4, pb: 8, cursor: 'default' }}
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
          About the Registry
        </Typography>

        {/* Main Description Section */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body1"
            paragraph
          >
            The <strong >Registry of Adaptation Practitioners</strong> is an online guided directory of vetted adaptation service providers. The Registry 
            enables communities and organizations seeking climate adaptation support services to easily find practitioners whose expertise and focus match their needs. 
          </Typography>

          <Typography
            variant="body1"
            paragraph
          >
            The Registry is open to all organizations that provide climate adaptation and resilience services. For climate adaptation practitioners, 
            the Registry offers an opportunity to showcase their organization and its skills, be discoverable by those that need their help, and be 
            eligible for funding from sources, such as the <a
              href="https://climatesmartcommunity.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}
            >Climate Smart Communities Initiative. </a>
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
          In order to be accepted into the Registry, organizations must submit an application that is then reviewed and approved to ensure that 
          they possess the depth of expertise and skill that will allow them to provide effective, equitable, and sustainable adaptation services to 
          communities, and that they adhere to the known best practices in the field. The review process assesses:
          </Typography>

          <Typography component="ul"  sx={{ mt: 1, mb: 2, ml: 2, mr: 2}}>
              <li>
                Length of time working in the field
              </li>
              <li>
                Whether practitioners have certifications or training, such as the NOAA Steps to Resilience training
              </li>
              <li>
                Proficiency incorporating stakeholder engagement and equity into adaptation work
              </li>
              <li>
               Expertise and ability to provide adaptation services from vulnerability assessment and adaptation planning to project implementation
              </li>
          </Typography>
        </Box>

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
          mb: 4,
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

        {/* Foundation Support Section */}
        <Box sx={{ mt: 1, mb: 4 }}>
          <Typography
            variant="body1"
            paragraph
          >
            The Registry of Adaptation Professionals is made possible by the Walton Family Foundation and the Gordon and Betty Moore Foundation.
          </Typography>
        </Box>

        {/* Partners Section */}
        <Box>
          <Typography
            variant="body1"
            sx={{ mb: 4 }}
          >
            The Registry is conceived, supported, directed, created and operated by EcoAdapt, Climate Resilience Fund, Geos, and UNC Asheville's NEMAC. 
          </Typography>

          <Grid
            container
            spacing={4}
          >
            {[
              { name: 'EcoAdapt', imgSrc: ecoadapt_logo, url: 'https://ecoadapt.org' },
              { name: 'Climate Resilience Fund', imgSrc: crf_logo, url: 'https://climateresiliencefund.org' },
              { name: 'Geos Institute', imgSrc: geos_logo, url: 'https://geosinstitute.org' },
              { name: 'UNC Asheville\'s NEMAC', imgSrc: nemac_logo, url: 'https://nemac.unca.edu' },
            ].map((partner, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <PartnerLogo {...partner} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
