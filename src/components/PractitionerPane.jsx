
import { useRef } from "react";
import { Typography, Box, styled } from "@mui/material";

import PersonIcon from "./svg/PersonIcon";
import ProfilePopper from "./ProfilePopper";
import HeaderBox from './HeaderBox';
import Section from './Section';
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import GradCapIcon from './svg/GradCapIcon';

import theme from '../theme';


const matchVals = (commCats, practCats) => {
  return commCats.map(commCat => practCats.includes(commCat))
}


const StyledBox = styled(Box)({
  height: 45,
})

function StrTrainedBadge({ isTrained }) {

  if (isTrained === 'Yes') {
    return <StyledBox
      boxShadow={3}
      sx={{
        display: 'inline-flex',
        width: '100%',
        borderRadius: {
          xs: 0,
          md: 4,
        },
        bgcolor: {
          xs: 'primary.lightBlue',
          md: 'primary.main',
        },
        color: 'primary.lightGray',
        flexGrow: 'space-around',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
      }} 
    >
      <GradCapIcon></GradCapIcon>
      <Typography
        sx={{
          display: {
            xs: 'none',
            md: 'inherit',
          },
          fontSize: '1rem',
          marginLeft: '10px',
          verticalAlign: 'baseline',
        }}>STR Trained</Typography>
    </StyledBox>
  } else {
    return <StyledBox
      sx={{
        bgcolor: {
          xs: 'primary.main',
          md: 'primary.lightGray',
        }
      }}
    >
    </StyledBox>
  }
}



function PractitionerHeader({
  strTrained,
  practitioner,
  poppedPractitioner,
  setPoppedPractitioner
}) {

  const headerRef = useRef(null);

  const onMouseEnter = e => {
    setPoppedPractitioner(practitioner)
  }

  return (
    <HeaderBox
      ref={ headerRef }
      onMouseEnter={ onMouseEnter }
    >
      <StyledBox
        sx={{
          display: 'flex',
          verticalAlign: 'middle',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: {
            xs: 'primary.main',
            md: 'primary.lightGray',
          }
        }} 
      >
        <PersonIcon
          sx={{
            display: {
              xs: 'inherit',
              md: 'none',
            },
          }} 
        />
      </StyledBox>
      { /* practitioner label - hidden on xs */ }
      <Typography
        variant="h5"
        sx={{
          display: {
            xs: 'none',
            md: 'inherit',
          }
        }}
      >{ practitioner.org }</Typography>
      <StrTrainedBadge isTrained={ strTrained }></StrTrainedBadge>
      <ProfilePopper
        headerRef={ headerRef }
        practitioner={ practitioner }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
      ></ProfilePopper>
    </HeaderBox>
  )
}


export default function PractitionerPane ({
  community,
  practitioner,
  poppedPractitioner,
  setPoppedPractitioner
}) {
  
  const sections = [
    [ [community.state], practitioner.state ],
    [ community.activities, practitioner.activities ],
    [ community.sectors, practitioner.sectors ],
    [ community.hazards, practitioner.hazards ],
    [ [community.size], practitioner.size ],
  ]
    .map(([ commCats, practCats ]) => matchVals(commCats, practCats))
    .map((matches, index) => {
      return {
        type: 'practitioner',
        key: `section${index}`,
        cards: matches
      }
    })

  return (
    <Box
      style={{
        flex: '1 1 33%',
        backgroundColor: theme.palette.primary.lightGray,
      }}
    >
      <PractitionerHeader
        practitioner={ practitioner }
        linkPath={ `#/practitioner/${practitioner.id}`}
        strTrained={ practitioner.strTrained }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
      ></PractitionerHeader>
      <Pane
        boxShadow={2} 
      >
        { sections.map((section) => Section(section)) }
        <ScoreSection
          style={{
            justifyContent: 'center',
          }}
        >
          <Box>{ practitioner.matchScore }</Box>
        </ScoreSection>
      </Pane>
    </Box>
  )
}
