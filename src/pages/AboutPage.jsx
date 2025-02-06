import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Logo from '../components/Logo';
import crf_logo from '../assets/CRF_logo.jpg';
import ecoadapt_logo from '../assets/EcoAdapt_logo.jpg';
import geos_logo from '../assets/geos_logo.jpg';
import nemac_logo from '../assets/nemac_logo.png';

// Placeholder component for partner logos
const PartnerLogo = ({ name, imgSrc }) => (
  <Paper
    elevation={2}
    sx={{
      p: 4,
      height: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 2,
      bgcolor: 'primary.white',
    }}
  >
    <Box
      component="img"
      src={imgSrc || '/api/placeholder/150/100'}
      alt={name}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        mb: 2,
      }}
    />
    <Typography
      variant="h6"
      align="center"
    >
      {name}
    </Typography>
  </Paper>
);

export default function AboutPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{ pt: 4, pb: 8 }}
      >
        <Logo />

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
          About the adaptation registry?
        </Typography>

        {/* Main Description Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="body1"
            paragraph
          >
            The Registry of Adaptation Practitioners is an online guided directory of vetted adaptation service
            providers. The Registry enables communities and organizations seeking climate adaptation support services to
            easily find practitioners whose expertise and focus match their needs.
          </Typography>

          <Typography
            variant="body1"
            paragraph
          >
            The Registry of Adaptation Practitioners is open to all organizations that provide climate adaptation and
            resilience services. For climate adaptation practitioners, the Registry offers an opportunity to showcase
            their organization and its skills, be discoverable by those that need their help, and be eligible for
            funding from sources, such as the Climate Smart Communities Initiative.
          </Typography>
        </Box>

        {/* Registration Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            Want to be included in the Registry?
          </Typography>

          <Typography
            variant="body1"
            paragraph
          >
            If your organization provides services in the field of climate resilience and adaptation, is committed to
            following best practices, and has a track record of high-quality results, submit an application! We are
            especially interested in organizations that support entire community adaptation processes, including
            stakeholder engagement, vulnerability assessment, adaptation planning, and plan implementation.
          </Typography>

          <Button
            variant="contained"
            href="/submit-application"
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
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="body1"
            paragraph
          >
            The Registry of Adaptation Professionals is made possible by the Walton Family Foundation and the Gordon and
            Betty Moore Foundation.
          </Typography>
        </Box>

        {/* Partners Section */}
        <Box>
          <Typography
            variant="body1"
            sx={{ mb: 4 }}
          >
            The Registry is conceived, supported, directed, created and operated by:
          </Typography>

          <Grid
            container
            spacing={4}
          >
            {[
              { name: 'EcoAdapt', imgSrc: ecoadapt_logo },
              { name: 'Climate Resilience Fund', imgSrc: crf_logo },
              { name: 'Geos Institute', imgSrc: geos_logo },
              { name: 'NEMAC', imgSrc: nemac_logo },
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
