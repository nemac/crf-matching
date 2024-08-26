// React
import { useState, useLayoutEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// API
import { fetchCommunity, fetchPractitionersForCommunity } from '../util/api'

// components
import { CssBaseline, Stack, Container } from '@mui/material'

import FullPageSpinner from '../components/FullPageSpinner';
import PractitionerPane from '../components/PractitionerPane';
import CommunityPane from '../components/CommunityPane';

import { ThemeProvider } from "@mui/material/styles";

// theme
import theme from '../theme';


/// Match Page (Loaded) ///

function CommunityPageLoaded({ community, practitioners }) {

  // Profile info popup
  const [ poppedPractitioner, setPoppedPractitioner ] = useState(null)

  const practitionerPanes = practitioners.map(pract => {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ p: 1 }}>
        <Stack
          direction='row'
          gap={1}
          ml={1}
          sx={{
            bgcolor: theme.palette.primary.lightGray,
          }}
        >
          <CommunityPane
            sx={{
              borderRadius: 8,
              flex: '2 1 40%',
            }}
            community={ community }
          ></CommunityPane>
          <div
            style={{
              flex: '1 1 60%',
              display: 'flex'
            }} 
          >
            { practitionerPanes }
          </div>
        </Stack>
      </Container>
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
      <div>
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
