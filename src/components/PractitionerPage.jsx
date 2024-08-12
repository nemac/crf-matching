
// router
import { useParams } from 'react-router-dom'

// react
import { useState, useEffect } from 'react'

// API
import { fetchPractitioner } from '../util/api'

// Material UI
import Divider from '@mui/material/Divider'

// styles
import styles from '../styles'


function Header ({ practitioner }) {
  return (
    <div>
      <h1
        style={{
          paddingTop: '8vh',
          paddingBottom: '2vh',
          paddingLeft: '1vw',
          borderRadius: '10px',
          backgroundColor: '#FFEED2',
        }}>{ practitioner.org }</h1>
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div>
      <h2
        style={{
          color: '#2D3F5D',
          margin: '0px',
        }}
      >{ title }</h2>
      <Divider
        style={{
          backgroundColor: '#2D3F5D',
          marginTop: '1vh',
          marginBottom: '1vh',
        }}
      >
      </Divider>
    </div>
  )
}

function StrTrainedRow ( { isTrained }) {
  return(
    <div>
      <svg
        verticalAlign='middle'
        width="30"
        height="20"
        viewBox="0 0 30 24"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.66683 13.5733V18.9067L15.0002 24L24.3335 18.9067V13.5733L15.0002 18.6667L5.66683 13.5733ZM15.0002 0L0.333496 8L15.0002 16L27.0002 9.45333V18.6667H29.6668V8L15.0002 0Z" fill="#FAFAFA"/>
      </svg>
      <span
        style={{
          marginLeft: '15px',
          verticalAlign: 'baseline'
        }}
      >{ isTrained ? 'STR Training Class Completed' : 'Not STR Trained' }</span>
    </div>
  )
}

function Training ({ practitioner }) {
  return (
    <div
      style={{
        backgroundColor: '#2D3F5D',
        border: '1px solid #D1E9FF',
        color: '#FAFAFA',
        borderRadius: '10px',
        paddingLeft: '.5vw',
        paddingRight: '.5vw',
        paddingBottom: '2vh',
        paddingTop: '1vh',
        marginBottom: '3vh',
      }}
    >
      <h2
        style={{
          marginBtop: '0px',
          marginBottom: '0px',
        }} 
      >Certifications & Training</h2>
      <Divider
        style={{
          backgroundColor: '#FAFAFA',
          marginBottom: '2vh'
        }} 
        aria-hidden="true"
      ></Divider>
      <StrTrainedRow
        isTrained={ practitioner.strTrained === 'Yes' ? true : false }>
      </StrTrainedRow>
    </div>
  )
}

/// Contact ///

function ContactRow({ type, content }) {

}

function ContactSection({ practitioner }) {
  return (
    <div>
      <SectionHeader
        title="Practitioner Org Contact"
      ></SectionHeader>
    </div>
  )
}


/// Match Section ///

function MatchBadge({ label }) {
  return <div
    style={{
      border: '1px solid #000000',
      borderRadius: '40px',
      backgroundColor: '#7891BB',
      color: '#000000',
      margin: '.2vw',
      alignContent: 'center',
      textAlign: 'center',
      paddingLeft: '2vw',
      paddingRight: '2vw',
      paddingTop: '1vh',
      paddingBottom: '1vh',
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
        paddingLeft: '.5vw',
        paddingRight: '.5vw',
      }}
    >
      <SectionHeader
        title={ title }
      ></SectionHeader>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: '#F1ECE4',
          borderRadius: '10px',
          minHeight: '5vh',
          paddingLeft: '1vw',
          paddingRight: '1vw',
          paddingTop: '1vh',
          paddingBottom: '1vh',
          marginBottom: '2.5vh',
        }}
      >
        { matchBadges }
      </div>
    </div>
  )
}


/// Practitioner Page (Loaded) ///

function PractitionerPageLoaded({ practitioner }) {
  return <div>
    <Header
      practitioner={ practitioner }
    ></Header>
    <Training
      practitioner={ practitioner } 
    ></Training>
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
    <ContactSection
      practitioner={ practitioner }
    ></ContactSection>
  </div>
}

/// Practitioner Page ///

function PractitionerPage() {

  const { practitionerId } = useParams()

  const [ practitioner, setPractitioner ] = useState(null)

  useEffect(() => {
    fetchPractitioner(practitionerId, setPractitioner)
  }, [])

  if (practitioner) {
    console.log('Rendering...')
    return (
      <div
        style={{
          ...styles.global
        }}
      >
        <PractitionerPageLoaded
          practitioner={ practitioner }
        ></PractitionerPageLoaded>
      </div>
    )
  } else {
    console.log('Loading...')
    return (
      <div
        style={{
          ...styles.global
        }}
      >
        <h3>Loading...</h3>
      </div>
    )
  }

}

export default PractitionerPage