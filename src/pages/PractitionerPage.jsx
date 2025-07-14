import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Stack, Container, Box, Typography, styled, AppBar, Toolbar, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from '../theme';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FullPageSpinner from '../components/FullPageSpinner';
import ContactRow from '../components/ContactRow';
import SectionHeader from '../components/SectionHeader';
import WorkExamples from '../components/WorkExamples';
import Logo from '../components/Logo';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NavBar from '../components/NavBar';
import HubIcon from '@mui/icons-material/Hub';


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
    title: 'Where we work',
    objKey: 'state',
  },  
];


function MatchBadge({ label, key, filters, objKey }) {
  const objKeyTopFilter = objKey === 'org_services_provided_top' ? 'activities' : objKey;
  const matchChipColor = objKey === 'org_services_provided_top' ? theme.palette.primary.lightPurple : theme.palette.primary.tan
  return (
    <Box
      key={key}
      sx={{
        backgroundColor: filters[objKeyTopFilter].includes(encodeURIComponent(label)) ? matchChipColor : 'unset',
        // objKey === 'org_services_provided_top' ? '#FFEED2' : '#FFEED2' : objKey === 'org_services_provided_top' ? theme.palette.primary.lightPurple : 'unset',
        border: objKey === 'org_services_provided_top' ? `1px solid ${theme.palette.primary.darkPurple}` : `1px solid ${theme.palette.primary.midBlue}`,
        borderRadius: 6,
        color: objKey === 'org_services_provided_top' ? theme.palette.primary.darkPurple :  theme.palette.primary.main,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: objKey === 'org_services_provided_top' ? '0.75rem' : '0.75rem',
        display: 'flex',
        py: 1.25,
        px: 2.5,
        m: 0.5,
        mb: objKey === 'org_services_provided_top' ? 2 : 0.5,
        minWidth: '75px',
      }}
    >
     
      { filters[objKeyTopFilter].includes(encodeURIComponent(label))  &&  (<CheckCircleIcon key={key} sx={{ mr: 0.5, fontSize: '1.1rem' }}/>)}
      {label}
    </Box>
  );
}

function MatchSection({ filters, practitioner, title, objKey }) {
  // fixes for blank top 3
  const items = Array.isArray(practitioner[objKey]) ? practitioner[objKey] : [];
  const activeFilters = Array.isArray(filters[objKey]) ? filters[objKey] : [];

    // Return nothing if items is null, undefined, or not an array
  if (!Array.isArray(items) || items.length === 0) {
    return <></>;
  }

  const matchBadges = items.map((label, index) => {
    return MatchBadge({ label, key: index, filters: { ...filters, [objKey]: activeFilters }, objKey });
  });
  
  return (
    <Box sx={{ mb: 2, }}>
      <SectionHeader title={title}></SectionHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '50px',
        }}
      >
        {matchBadges}
      </Box>
    </Box>
  );
}

const ContactAndTrainingBox = styled(Grid)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  margin: theme.spacing(1),
}));

function PractitionerPageLoaded({ practitioner }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const logoWidth = isSmallScreen ? 125 : 180;
  const [pageSelect, setPageSelect] = useState('registry');

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

  const getCountExamples = (practitioner) =>
  ['example1_description', 'example2_description', 'example3_description']
    .filter(key => {
      const val = practitioner[key]?.trim();
      return val && val.length > 1 && val.toLowerCase() !== 'not answered';
    }).length;

  const countExamples = getCountExamples(practitioner);
  const exampleWidth = countExamples > 0 ? 12/countExamples : 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Container
        maxWidth="xl"
        sx={{ p: 3, pb: 8, cursor: 'default'  }}
      >
        {/* <Logo /> CSCI Logo */}
        {/* Header */}
        {/* <SectionHeader title="Registry of Adaptation Practitioner Profile"></SectionHeader>       */}
      
        {practitioner.org_registry_category === 'Specialist' ? (
          <Box sx={{ width: 'fit-content', my: 2, pl: 4, pr: 10, py: 1,  borderRadius: 3, color: theme.palette.purple, backgroundColor: theme.palette.primary.cellHoverBg }}>

              <Typography variant="subtitle1">
                  <AutoAwesomeIcon sx={{ fontSize: '1.0rem', mr: 0.5, color: 'primary.main' }}/> {practitioner.org_registry_category}
              </Typography>
          </Box>
        ) : (
          <Box sx={{  width: 'fit-content', my: 2, pl: 4, pr: 10, py: 1,  borderRadius: 3, color: theme.palette.primary.darkTan, backgroundColor: theme.palette.primary.tan }}>
              <Typography variant="subtitle1">
                  <HubIcon sx={{ fontSize: '1.0rem', mr: 1.0, color: theme.palette.primary.darkTan}}/>  {practitioner.org_registry_category || 'Broad service provider'}
              </Typography>
          </Box>
        )}

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
          {/* Training */}
          {/* <ContactAndTrainingBox xs={12} lg={5} >
            <StrTrainedRow isTrained={practitioner.strTrained === 'Yes' ? true : false}></StrTrainedRow>
          </ContactAndTrainingBox>            */}
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
        <Box>
          <SectionHeader title="Completed Steps to Resilience Training"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {practitioner.strTrained || 'N/A'}
          </Box>
        </Box>          
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
        <WorkExamples practitioner={practitioner} />

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
