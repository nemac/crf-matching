import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Stack, Container, Box, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import theme from '../theme';
import PlaceIcon from '@mui/icons-material/Place';
import FullPageSpinner from '../components/FullPageSpinner';
import ContactRow from '../components/ContactRow';
import SectionHeader from '../components/SectionHeader';
import MatchSection from '../components/MatchSection';
// import WorkExamples from '../components/WorkExamples';
import PractitionerTypeChip from '../components/PractitionerTypeChip';
import NavBar from '../components/NavBar';

// API
import { fetchPractitioner } from '../util/api';

const sections = [
  {
    title: 'Our top 3 services',
    objKey: 'org_services_provided_top',
  },  
  {
    title: 'Services Provided',
    objKey: 'activities',
  },
  {
    title: 'Hazard Expertise',
    objKey: 'hazards',
  },
  {
    title: 'Sector Expertise',
    objKey: 'sectors',
  },
  {
    title: 'Size of Communities Where We Work',
    objKey: 'size',
  },
  {
    title: 'Where We Work',
    objKey: 'state',
  },  
];

const ContactAndTrainingBox = styled(Grid)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  margin: theme.spacing(1),
}));

function PractitionerPageLoaded({ practitioner }) {
  const currentParams = window.location.search || '';
  
  const params = new URLSearchParams(window.location.search);
  const filters = {
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
    state: [],
  };
  
    // Parse each filter type
  Object.keys(filters).forEach((key) => {
    const param = params.get(key);
    if (param) {
      filters[key] = param.split(',');
    }
  });

  const specialty = practitioner.org_registry_category_specialist;

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
        <PractitionerTypeChip 
          type={practitioner.org_registry_category} 
          label={practitioner.org_registry_category}
          list={specialty}
          size={'large'}/>

        <Typography
          variant="h3"
          fontWeight={800} 
          sx={{ mb: 3 }}>
          {practitioner.org}
        </Typography>

        {/* Contact & Training Row */}
        <Grid
          container
          spacing={1}
          gap={1}
          sx={{ mb: 2 }}
        >
          {/* Contact */}
          <ContactAndTrainingBox
            xs={12}
            lg={12}
            sx={{
              boxShadow: 3,
              color: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
            }}
          >
            <SectionHeader title="Contact"></SectionHeader>
            <Stack spacing={0.5} sx={{ mt: 1 }}>
              <ContactRow
                type="website"
                practitioner={practitioner}
              ></ContactRow>
              <ContactRow
                type="email"
                practitioner={practitioner}
              ></ContactRow>
              <ContactRow
                type="phone"
                practitioner={practitioner}
              ></ContactRow>
              <ContactRow
                type="linkedIn"
                practitioner={practitioner}
              ></ContactRow>              
            </Stack>
          </ContactAndTrainingBox>
        </Grid>
        <Box>
          <SectionHeader title="Organization Location"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
              alignContent: 'center',
              justifyContent: 'start',
              display: 'flex',
            }}
          >
            <PlaceIcon sx={{ mr: 1 }} /> {practitioner.org_city || 'N/A'}, {practitioner.org_state || 'N/A'}
          </Box>
        </Box>        
        <Box>
          <SectionHeader title="Organization Description"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {practitioner.info || 'N/A'}
          </Box>
        </Box>      
        <Box>
          <SectionHeader title="Community Specializations"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {practitioner.specificTypesOfCommunities || 'N/A'}
          </Box>
        </Box>
        <Box>
          <SectionHeader title="Organization Type"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 2,
            }}
          >
            {practitioner.organizationType || 'N/A'}
          </Box>
        </Box>
        {/* <Box>
          <SectionHeader title="Completed Steps to Resilience Training"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {practitioner.strTrained || 'N/A'}
          </Box>
        </Box>           */}
        {sections.map((data, index) => {
          return (
            <MatchSection
              filters={filters}
              practitioner={practitioner}
              title={data.title}
              objKey={data.objKey}
              key={index}
            ></MatchSection>
          );
        })}
        {/* <WorkExamples practitioner={practitioner} filters={currentParams}/> */}

      </Container>
    </ThemeProvider>
  );
}

/// Practitioner Page ///
function PractitionerPage() {
  const { practitionerId } = useParams();

  const [practitioner, setPractitioner] = useState(null);

  useLayoutEffect(() => {
    fetchPractitioner(practitionerId, setPractitioner);
  }, []);

  if (practitioner) {
    return <PractitionerPageLoaded practitioner={practitioner} />;
  } else {
    return <FullPageSpinner />;
  }
}

export default PractitionerPage;
