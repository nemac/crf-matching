
import { useState } from 'react';
import PractMatchList from './PractMatchList';

export default function PractitionerPanel({ community, practitioners }) {

  // Profile info popup
  const [ poppedPractitioner, setPoppedPractitioner ] = useState(null)

  const practMatchLists = practitioners.map(pract => {
    return <PractMatchList
      community={ community }
      practitioner={ pract }
      poppedPractitioner={ poppedPractitioner }
      setPoppedPractitioner={ setPoppedPractitioner }
      style={{
        flex: 1
      }}
    ></PractMatchList>
  })
  return (
    <>
      { practMatchLists }
    </>
  )
}

