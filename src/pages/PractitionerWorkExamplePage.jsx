import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Button, Typography } from '@mui/material';
import theme from '../theme';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import FullPageSpinner from '../components/FullPageSpinner';
import SectionHeader from '../components/SectionHeader';
import NavBar from '../components/NavBar';

// API
import { fetchPractitioner } from '../util/api';

function PractitionerWorkExamplePageLoaded({ practitioner }) {
  const params = new URLSearchParams(window.location.search);
  params.delete('workedExampleIndex');


  const workedExampleIndex = new URLSearchParams(window.location.search).get('workedExampleIndex') || 1;
  let ExampleTitle = '';
  let ExampleDescription = '';
  let ExampleLinks = '';
  let ExampleLocation = '';
  let ExampleEngagement = '';
  let ExampleEquity = '';

  switch (workedExampleIndex) {
    case '1':
      ExampleTitle = practitioner.example1_title;
      ExampleDescription = practitioner.example1_description;
      ExampleLinks = practitioner.example1_links;
      ExampleLocation = practitioner.example1_location;
      ExampleEngagement = practitioner.example1_engagement;
      ExampleEquity = practitioner.example1_equity;
      break;
    case '2':
      ExampleTitle = practitioner.example2_title;
      ExampleDescription = practitioner.example2_description;
      ExampleLinks = practitioner.example2_links;
      ExampleLocation = practitioner.example2_location;
      ExampleEngagement = practitioner.example2_engagement;
      ExampleEquity = practitioner.example2_equity;
      break;
    case '3':
      ExampleTitle = practitioner.example3_title;
      ExampleDescription = practitioner.example3_description;
      ExampleLinks = practitioner.example3_links;
      ExampleLocation = practitioner.example3_location;
      ExampleEngagement = practitioner.example3_engagement;
      ExampleEquity = practitioner.example3_equity;
      break;
    default:
      ExampleTitle = practitioner.example1_title;
      ExampleDescription = practitioner.example1_description;
      ExampleLinks = practitioner.example1_links;
      ExampleLocation = practitioner.example1_location;
      ExampleEngagement = practitioner.example1_engagement;
      ExampleEquity = practitioner.example1_equity;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Container
        maxWidth="xl"
        sx={{ 
          p: 3,
          pb: 8,
          cursor: 'default',
          px: { xs: 4, sm: 4, md: 4, lg: 4 },
        }}
      >


        <Typography
          variant="h3"
          fontWeight={800} 
          sx={{ mb: 3 }}>
          Example of our Work
        </Typography>

        <Box>
          <SectionHeader title="Practitioner Organization"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
              alignContent: 'center',
              justifyContent: 'start',
              display: 'flex',
              fontWeight: 'medium',
              fontSize: '1.5rem',
            }}
          >
            { practitioner.org || 'N/A'}
          </Box>
        </Box>    

        <Box>
          <SectionHeader title="Project Title"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
              alignContent: 'center',
              justifyContent: 'start',
              display: 'flex',
            }}
          >
            {ExampleTitle || 'N/A'}
          </Box>
        </Box>     

        <Box>
          <SectionHeader title="Project Location"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
              alignContent: 'center',
              justifyContent: 'start',
              display: 'flex',
            }}
          >
            {ExampleLocation || 'N/A'}
          </Box>
        </Box>        
        <Box>
          <SectionHeader title="Work Organization Description"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {ExampleDescription || 'N/A'}
          </Box>
        </Box>      
        <Box>
          <SectionHeader title="How We Did Stakeholder Engagement"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {ExampleEngagement || 'N/A'}
          </Box>
        </Box>
        <Box>
          <SectionHeader title="How We Did Equity"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {ExampleEquity || 'N/A'}
          </Box>
        </Box>
        <Box>
            <Button
              variant="contained"
              href={`/practitioner/${practitioner.airtableRecId}?${params.toString()}`}
              rel="noopener noreferrer"
              startIcon={<PersonIcon />}
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.medPurple,
                borderRadius: 8,
                textTransform: 'none',
                mt: 6,
                mb: 2,
                px: 4,
                py: 1.5,
                boxShadow: '0px 1px 1px -1px',
                '&:hover': {
                  backgroundColor: theme.palette.primary.lightPurple,
                  boxShadow: '0px 2px 2px -2px',
                },
              }}
            >
              Back to Practitioner Profile
            </Button>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

/// Practitioner Page ///
function PractitionerWorkExamplePage() {
  const { practitionerId } = useParams();

  const [practitioner, setPractitioner] = useState(null);

  useLayoutEffect(() => {
    fetchPractitioner(practitionerId, setPractitioner);
  }, []);

  if (practitioner) {
    return <PractitionerWorkExamplePageLoaded practitioner={practitioner} />;
  } else {
    return <FullPageSpinner />;
  }
}

export default PractitionerWorkExamplePage;