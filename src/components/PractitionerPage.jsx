
// styles
import styles from '../styles'

// router stuff
import { useParams } from 'react-router-dom'

// react
import { useState, useEffect } from 'react'

// API
import { fetchPractitioner } from '../util/api'


/// Practitioner Page (Loaded) ///

function PractitionerPageLoaded() {
  return <div>

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