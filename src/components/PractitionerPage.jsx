
// router stuff
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
      <h3
        style={{
          paddingTop: '8vh',
          paddingBottom: '2vh',
          paddingLeft: '1vw',
          borderRadius: '10px',
          backgroundColor: '#FFEED2',
        }}>{ practitioner['Organization Name'] }</h3>
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div>
      <h3
        style={{
          color: '#2D3F5D',
          margin: '0px',
        }}
      >{ title }</h3>
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
      <h4
        style={{
          marginBtop: '0px',
          marginBottom: '0px',
        }} 
      >Certifications & Training</h4>
      <Divider
        style={{
          backgroundColor: '#FAFAFA',
          marginBottom: '2vh'
        }} 
        aria-hidden="true"
      ></Divider>
      <div>
        No certifications
      </div>
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
          padding: '15px',
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
      objKey="State"
    ></MatchSection>
    <MatchSection
      practitioner={ practitioner }
      title="Activities we have expertise with"
      objKey="Activities"
    ></MatchSection>
    <MatchSection
      practitioner={ practitioner }
      title="Sectors we have expertise with"
      objKey="Sectors"
    ></MatchSection>
    <MatchSection
      practitioner={ practitioner }
      title="Hazards we have expertise with"
      objKey="Hazards"
    ></MatchSection>
    <MatchSection
      practitioner={ practitioner }
      title="Size of communities we have expertise with"
      objKey="Size"
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