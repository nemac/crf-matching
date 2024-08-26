import { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid, Container, Box, Typography, styled } from '@mui/material'

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
        color: 'primary.main',
        mb: 2,
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
    <div>
      <GradCapSvg/>
      <span
        style={{
          marginLeft: '15px',
        }}
      >STR Training Class Completed</span>
    </div>
  )
}

function MatchBadge({ label }) {
  return <div
    style={{
      border: `1px solid ${theme.palette.primary.midBlue}`,
      borderRadius: '40px',
      color: theme.palette.primary.midBlue,
      alignContent: 'center',
      margin: '10px',
      textAlign: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '10px',
      paddingBottom: '10px',
    }}
  >{ label }</div>
}

function MatchSection({ practitioner, title, objKey }) {

  const matchBadges = practitioner[objKey].map(label => {
    return MatchBadge({ label })
  })

  return (
    <div>
      <SectionHeader
        title={ title }
      ></SectionHeader>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          borderRadius: '10px',
          minHeight: '50px',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '10px',
          paddingBottom: '10px',
          marginBottom: '20px',
        }}
      >
        { matchBadges }
      </div>
    </div>
  )
}

const ContactAndTrainingBox = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: 10,
  padding: 10,
  margin: 10,
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
              color: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
            }}
          >
            <SectionHeader
              title="Practitioner Org Contact"
            ></SectionHeader>
            <ContactRow type="linkedIn" practitioner={ practitioner }></ContactRow>
            <ContactRow type="website" practitioner={ practitioner }></ContactRow>
            <ContactRow type="email" practitioner={ practitioner }></ContactRow>
            <ContactRow type="phone" practitioner={ practitioner }></ContactRow>
          </ContactAndTrainingBox> 

          { /* Training */ }
          <ContactAndTrainingBox
            sx={{
              color: 'primary.lightGray',
              bgcolor: 'primary.main',
              border: `1px solid ${theme.palette.primary.midBlue}`,
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