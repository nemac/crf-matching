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
import Logo from '../components/Logo';

// API
import { fetchPractitioner } from '../util/api';

const sections = [
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

function SectionHeader({ title, style }) {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        ...style,
      }}
    >
      {title}
    </Typography>
  );
}

// function StrTrainedRow({ isTrained }) {
//   if (!isTrained) {
//     return '';
//   }
//   return (
//     <Box
//       sx={{
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: 2,
//       }}
//     >
//       <SchoolIcon />
//       <span>Steps to Resilience certified</span>
//     </Box>
//   );
// }

function MatchBadge({ label, key, filters, objKey }) {
  return (
    <Box
      key={key}
      sx={{
        backgroundColor: filters[objKey].includes(encodeURIComponent(label)) ? '#FFEED2' : 'unset',
        border: `1px solid ${theme.palette.primary.midBlue}`,
        borderRadius: 6,
        color: theme.palette.primary.main,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '0.75rem',
        display: 'flex',
        p: 1.25,
        m: 0.5,
        minWidth: '75px',
      }}
    >
      { filters[objKey].includes(encodeURIComponent(label))  &&  (<CheckCircleIcon key={key} sx={{ mr: 0.5, fontSize: '1.1rem' }}/>)}
      {label}
    </Box>
  );
}

function MatchSection({ filters, practitioner, title, objKey }) {
  const matchBadges = practitioner[objKey].map((label, index) => {
    return MatchBadge({ label, key: index, filters, objKey });
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          bgcolor: 'primary.white',
          boxShadow: 1,
          borderBottom: `1px solid ${theme.palette.primary.borderGray}`,
        }}
      >
      <Container maxWidth="lg"> 
        <Toolbar sx={{ gap: 3, maxWidth: "lg"}}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',              
              width: `${logoWidth}px`,
              py: 1,
              pt: 2,
              pb: 1,
            }}
          >
            <Logo />
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Button
              //component={Link}
              //to="/"
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '1rem',
                padding: 0,
                minWidth: 0,
                textDecoration: pageSelect === 'registry' ? 'underline' : 'none',
                fontWeight: pageSelect === 'registry' ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                setPageSelect('registry');
              }}
            >
              {isSmallScreen ? ( 'Registry' ) : ( 'Registry of Adaptation Practitioners' )}
            </Button>

            <Button
              //component={Link}
              //to="/about"
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '1rem',
                padding: 0,
                minWidth: 0,
                textDecoration: pageSelect === 'about' ? 'underline' : 'none',
                fontWeight: pageSelect === 'about' ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                setPageSelect('about');
              }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
        </Container> 
      </AppBar>         
      <Container
        maxWidth="lg"
        sx={{ p: 3, cursor: 'default'  }}
      >
        {/* <Logo /> CSCI Logo */}
        {/* Header */}
        {/* <SectionHeader title="Registry of Adaptation Practitioner Profile"></SectionHeader>       */}
      
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            mb: 3,
          }}
        >
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
