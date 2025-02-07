import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import { CssBaseline, Stack, Container, Box, Typography, styled, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import theme from '../theme';
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
        mb: 1,
        ...style,
      }}
    >
      {title}
    </Typography>
  );
}

function StrTrainedRow({ isTrained }) {
  if (!isTrained) {
    return 'No certifications';
  }
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <SchoolIcon />
      <span>STR Training Class Completed</span>
    </Box>
  );
}

function MatchBadge({ label, key }) {
  return (
    <Box
      key={key}
      sx={{
        border: `1px solid ${theme.palette.primary.midBlue}`,
        borderRadius: 6,
        // color: 'primary.midBlue',
        color: theme.palette.primary.main,
        alignContent: 'center',
        textAlign: 'center',
        margin: .5,
        pl: 3,
        pr: 3,
        pt: 1,
        pb: 1,
      }}
    >
      {label}
    </Box>
  );
}

function MatchSection({ practitioner, title, objKey }) {
  const matchBadges = practitioner[objKey].map((label, index) => {
    return MatchBadge({ label, key: index });
  });

  return (
    <Box>
      <SectionHeader title={title}></SectionHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '50px',
          p: .025,
          mb: 1,
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{ p: 3 }}
      >
        <Logo /> {/* CSCI Logo */}
        {/* Header */}
        <Typography
          variant="h3"
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
            lg={5}
            sx={{
              boxShadow: 3,
              color: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
            }}
          >
            <SectionHeader title="Contact"></SectionHeader>
            <Stack>
              {/* <ContactRow
                type="linkedIn"
                practitioner={practitioner}
              ></ContactRow> */}
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
            </Stack>
          </ContactAndTrainingBox>

          {/* Training */}
          <ContactAndTrainingBox
            xs={12}
            lg={5}
            sx={{
              color: 'primary.lightGray',
              bgcolor: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
              boxShadow: 3,
            }}
          >
            <SectionHeader
              title="Certifications & Training"
              style={{
                color: theme.palette.primary.lightGray,
              }}
            ></SectionHeader>
            <StrTrainedRow isTrained={practitioner.strTrained === 'Yes' ? true : false}></StrTrainedRow>
          </ContactAndTrainingBox>
        </Grid>
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
          <SectionHeader title="Other Languages"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {practitioner.languageFluencies || 'N/A'}
          </Box>
        </Box>
        <Box>
          <SectionHeader title="Organization Type"></SectionHeader>
          <Box
            sx={{
              pb: 1,
              mb: 1,
            }}
          >
            {practitioner.organizationType || 'N/A'}
          </Box>
        </Box>
        {sections.map((data, index) => {
          return (
            <MatchSection
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
