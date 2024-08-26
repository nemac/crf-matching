// router
import { useParams } from 'react-router-dom'

// react
import { useState, useLayoutEffect } from 'react'

// API
import { fetchPractitioner } from '../util/api'

import theme from '../theme';

// components
import FullPageSpinner from '../components/FullPageSpinner';
import GradCapSvg from '../components/svg/GradCapIcon';
import ContactRow from '../components/ContactRow';


function Header ({ practitioner }) {
  return (
    <div>
      <h1
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          marginTop: '0px',
          marginLeft: '0px',
          marginRight: '0px',
          marginBottom: '15px',
        }}>{ practitioner.org }
      </h1>
    </div>
  )
}

function SectionHeader({ title, style }) {
  return (
    <div>
      <h3
        style={{
          color: theme.palette.primary.darkBlue,
          marginTop: '0px',
          marginBottom: '15px',
          ...style,
        }}
      >{ title }</h3>
   </div>
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
          verticalAlign: 'baseline'
        }}
      >STR Training Class Completed</span>
    </div>
  )
}

function Training ({ practitioner }) {
  return (
    <div>
      <SectionHeader
        title='Certifications & Training'
        style={{
          color: theme.palette.primary.lightGray
        }}
      ></SectionHeader>
      <StrTrainedRow
        isTrained={ practitioner.strTrained === 'Yes' ? true : false }>
      </StrTrainedRow>
    </div>
  )
}


/// Contact ///

function ContactSection({ practitioner }) {
  return (
    <div>
      <SectionHeader
        title="Practitioner Org Contact"
      ></SectionHeader>
      <ContactRow type="linkedIn" practitioner={ practitioner }></ContactRow>
      <ContactRow type="website" practitioner={ practitioner }></ContactRow>
      <ContactRow type="email" practitioner={ practitioner }></ContactRow>
      <ContactRow type="phone" practitioner={ practitioner }></ContactRow>
    </div>
  )
}


/// Match Section ///

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
    <div
      style={{
      }}
    >
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


/// Practitioner Page (Loaded) ///

function PractitionerPageLoaded({ practitioner }) {

  const contactAndTrainingStyle = {
    flex: 1,
    borderRadius: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    paddingTop: '10px',
    margin: '10px',
  }

  return (
    <div
      style={{
        paddingLeft: '20px',
      }} 
    >
      <Header
        practitioner={ practitioner }
      ></Header>

      { /* Contact and Training */ }
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'stretch',
          marginBottom: '20px',
        }} 
      >
        <div
          style={{
            ...contactAndTrainingStyle,
            border: `1px solid ${theme.palette.primary.midBlue}`,
          }}
        >
         <ContactSection
          practitioner={ practitioner }
          ></ContactSection>
        </div>
        <div
          style={{
            ...contactAndTrainingStyle,
            backgroundColor: theme.palette.primary.darkBlue,
            border: `1px solid ${theme.palette.primary.midBlue}`,
            color: theme.palette.primary.lightGray,
          }}
        >
          <Training
            practitioner={ practitioner}
          ></Training>
        </div>
      </div>

      <MatchSection
        practitioner={ practitioner }
        title="Where we work"
        objKey="state"
      ></MatchSection>

      <MatchSection
        practitioner={ practitioner }
        title="Activities we have expertise with"
        objKey="activities"
      ></MatchSection>

      <MatchSection
        practitioner={ practitioner }
        title="Sectors we have expertise with"
        objKey="sectors"
      ></MatchSection>

      <MatchSection
        practitioner={ practitioner }
        title="Hazards we have expertise with"
        objKey="hazards"
      ></MatchSection>

      <MatchSection
        practitioner={ practitioner }
        title="Size of communities we have expertise with"
        objKey="size"
      ></MatchSection>

    </div>
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
      <div>
        <PractitionerPageLoaded
          practitioner={ practitioner }
        ></PractitionerPageLoaded>
      </div>
    )
  } else {
    return (
      <FullPageSpinner></FullPageSpinner>
    )
  }

}

export default PractitionerPage