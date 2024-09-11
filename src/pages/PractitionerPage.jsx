import { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Stack, Container, Box, Typography, styled } from '@mui/material'

import theme from '../theme';
import FullPageSpinner from '../components/FullPageSpinner';
import GradCapSvg from '../components/svg/GradCapIcon';
import ContactRow from '../components/ContactRow';

// API
import { fetchPractitioner } from '../util/api'


const sections = [
  {
    title: "Where we work",
    objKey: "state",
  },
  {
    title: "Activities we have expertise with",
    objKey: "activities",
  },
  {
    title: "Sectors we have expertise with",
    objKey: "sectors",
  },
  {
    title: "Hazards we have expertise with",
    objKey: "hazards",
  },
  {
    title: "Size of communities we have expertise with",
    objKey: "size",
  }
]



function SectionHeader({ title, style }) {
  return (
    <Typography variant="h6"
      sx={{
        fontWeight: 700,
        color: 'primary.main',
        mb: 1,
        ...style
      }}
    >{ title }</Typography>
  )
}

function StrTrainedRow ( { isTrained }) {
  if (!isTrained) {
    return 'No certifications'
  }
  return (
    <Box>
      <GradCapSvg/>
      <span
        style={{
          marginLeft: '15px',
        }}
      >STR Training Class Completed</span>
    </Box>
  )
}

function MatchBadge({ label }) {
  return <Box
    sx={{
      border: `1px solid ${theme.palette.primary.midBlue}`,
      borderRadius: 6,
      color: 'primary.midBlue',
      alignContent: 'center',
      textAlign: 'center',
      margin: 1,
      pl: 3,
      pr: 3,
      pt: 1,
      pb: 1,
    }}
  >{ label }</Box>
}

function MatchSection({ practitioner, title, objKey }) {

  const matchBadges = practitioner[objKey].map(label => {
    return MatchBadge({ label })
  })

  return (
    <Box>
      <SectionHeader
        title={ title }
      ></SectionHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '50px',
          p: 1,
          mb: 1,
        }}
      >
        { matchBadges }
      </Box>
    </Box>
  )
}

const ContactAndTrainingBox = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  margin: theme.spacing(1),
}));


function PractitionerPageLoaded({ practitioner }) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth='lg'
      >

        { /* Header */ }
        <Typography
          variant="h3"
          sx={{
            mt: 3,
            mb: 3,
          }}>{ practitioner.org }</Typography>

        { /* Contact & Training */ }
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'stretch',
            mb: 2,
          }}
        >

          { /* Contact */ }
          <ContactAndTrainingBox
            sx={{
              boxShadow: 3,
              color: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
            }}
          >
            <SectionHeader
              title="Contact"
            ></SectionHeader>
            <Stack>
              <ContactRow type="linkedIn" practitioner={ practitioner }></ContactRow>
              <ContactRow type="website" practitioner={ practitioner }></ContactRow>
              <ContactRow type="email" practitioner={ practitioner }></ContactRow>
              <ContactRow type="phone" practitioner={ practitioner }></ContactRow>
            </Stack>
          </ContactAndTrainingBox> 

          { /* Training */ }
          <ContactAndTrainingBox
            sx={{
              color: 'primary.lightGray',
              bgcolor: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
              boxShadow: 3,
            }}
          >
            <SectionHeader
              title='Certifications & Training'
              style={{
                color: theme.palette.primary.lightGray
              }}
            ></SectionHeader>
            <StrTrainedRow
              isTrained={ practitioner.strTrained === 'Yes' ? true : false }>
            </StrTrainedRow>
          </ContactAndTrainingBox>

        </Box>


      {
        sections.map(data => {
          return <MatchSection
            practitioner={ practitioner }
            title={ data.title }
            objKey={ data.objKey }
          ></MatchSection>
        })
      }

      </Container>
    </ThemeProvider>
  )
}

/// Practitioner Page ///

function PractitionerPage() {

  const { practitionerId } = useParams()

  const [ practitioner, setPractitioner ] = useState(null)

  useLayoutEffect(() => {
    fetchPractitioner(practitionerId, setPractitioner)
  }, [])

  if (practitioner) {
    return (
      <PractitionerPageLoaded practitioner={ practitioner } />
    )
  } else {
    return (
      <FullPageSpinner />
    )
  }

}

export default PractitionerPage