
import { useState } from 'react';

import { useRef } from "react";
import { Typography } from "@mui/material";
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


function StrTrainedBadge({ isTrained }) {

  const trainedStyle = {
    height: '45px',
    marginTop: '10px',
  }
  if (isTrained === 'Yes') {
    return <div
      style={{
        ...trainedStyle,
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.lightGray,
        display: 'flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '.8em',
      }} 
    >
      <div>
        <GradCapIcon></GradCapIcon>
        <span
          style={{
            marginLeft: '10px',
            verticalAlign: 'baseline',
          }}>STR Trained</span>
      </div>
    </div>
  } else {
    return <div
      style={{
        ...trainedStyle,
        backgroundColor: theme.palette.primary.lightGray,
      }} 
    >

    </div>
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
      <Typography variant="h5">{ practitioner.org }</Typography>
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


function PractitionerPane ({
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
    .map(matches => {
      return {
        cards: matches
      }
    })

  return (
    <div
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
      <Pane>
        {
          sections.map((section, index) => {
            section.key=index;
            return Section(section)
          })
        }
        <ScoreSection
          style={{
            justifyContent: 'center',
          }}
        > <div>{ practitioner.matchScore }</div>
         
        </ScoreSection>
      </Pane>

    </div>
  )
}


export default function PractitionerPanel({ community, practitioners }) {

  // Profile info popup
  const [ poppedPractitioner, setPoppedPractitioner ] = useState(null)

  const panes = practitioners.map(pract => {
    return <PractitionerPane
      community={ community }
      practitioner={ pract }
      poppedPractitioner={ poppedPractitioner }
      setPoppedPractitioner={ setPoppedPractitioner }
      style={{
        flex: 1
      }}
    ></PractitionerPane>
  })
  return (
    <>
      { panes }
    </>
  )
}
