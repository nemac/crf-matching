// styles
import styles from '../styles'

// React
import { useState, useLayoutEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// API
import { fetchCommunity, fetchPractitionersForCommunity } from '../util/api'

// components
import { CssBaseline } from '@mui/material'

import FullPageSpinner from '../components/FullPageSpinner';
import CommunityPanel from '../components/CommunityPanel';
import PractitionerPanel from '../components/PractitionerPanel';

import { ThemeProvider } from "@mui/material/styles";

// theme
import theme from '../theme';


/// Match Page (Loaded) ///

function CommunityPageLoaded({ community, practitioners }) {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          backgroundColor: styles.colors.lightGray,
        }}
      >
        <div
          style={{
            flex: '2 1 40vw',
          }} 
        >
          <CommunityPanel
            community={ community }
            // width={ commCatListWidth }
            // headerMinHeight={ headerMinHeight }
          ></CommunityPanel>
        </div>
        <div
          style={{
            flex: '1 1 60vw',
            display: 'flex'
          }} 
        >
          <PractitionerPanel
            community={ community }
            practitioners={ practitioners }
            // listWidth={ practMatchListWidth }
            // headerMinHeight={ headerMinHeight }
          ></PractitionerPanel>
        </div>
      </div>
    </ThemeProvider>
  )
}


/// Community Page ///

export default function CommunityPage() {

  const [ community, setCommunity ] = useState(false)
  const [ practitioners, setPractitioners ] = useState([])

  const { communityId } = useParams()

  useLayoutEffect(() => {
    fetchPractitionersForCommunity(communityId, setPractitioners)
    fetchCommunity(communityId, setCommunity)
  }, [])

  if (community && practitioners.length) {
    return (
      <div
        style={{
          ...styles.global,
        }}
      >
        <CommunityPageLoaded
          community={ community }
          practitioners={ practitioners }
        ></CommunityPageLoaded>
      </div>
    )
  } else {
    return (
      <FullPageSpinner></FullPageSpinner>
    )
  }

}
