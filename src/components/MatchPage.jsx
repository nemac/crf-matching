// styles
import styles from '../styles'

// React
import { useState, useEffect } from 'react'

// API
import { fetchAllCommunities, fetchPractitionersForCommunity } from '../util/api'

// Material UI
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'


/// Generic Components ///

function HeaderCell({ content, type, linkPath }) {
  return (
    <div
      style={{
        minHeight: '10vh',
        fontSize: '1.5em',
        alignContent: 'center',
        textAlign: 'center'
      }}
    >
    { type === 'community' ? content : HeaderCellPractBadge({ content, linkPath }) }
    </div>
  )
}

function HeaderCellPractBadge({ content, linkPath }) {
  return (
    <>
    { /*
      <svg width="189" height="189" viewBox="0 0 189 189" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M110.475 119.673C106.275 117.523 100.825 115.773 94.5 115.773C88.175 115.773 82.725 117.523 78.525 119.673C76.025 120.948 74.5 123.523 74.5 126.323V133.273H114.5V126.323C114.5 123.523 112.975 120.948 110.475 119.673ZM88.95 113.273H100.05C103.075 113.273 105.4 110.623 105 107.623L104.2 101.498C103.425 96.7477 99.3 93.2727 94.5 93.2727C89.7 93.2727 85.575 96.7477 84.8 101.498L84 107.623C83.6 110.623 85.925 113.273 88.95 113.273Z"
        fill="#D1E9FF"
      />
      </svg>
    </>
    */ }
    <a
      href={ linkPath }
    >{ content || '(Org Name Not Found)' }</a>
    </>
  )
}

function Cell ({ label, type, key }) {
  return (
    <div
      key={ key }
      style={{
        borderRadius: '10px',
        backgroundColor: '#FFEED2',
        padding: '25px',
        marginBottom: '5px',
        verticalAlign: 'top',
        fontSize: '.9em',
        textAlign: type === 'community' ? 'left' : 'center',
        // keep row alignment on small screens
        maxHeight: '1vh'
      }}
    >
    { type === 'community' ? label : PractMatchSymbol({ label }) }</div>
  )
}

function Section ({ header='', type, cards, key }) {
  const cardComps = cards.map((label, index) => Cell({ label, type, key: index }))
  return (
    <div key={ key }>
      <h4
        style={{
          minHeight: '20px'
        }}
      >{ header }</h4>
      { cardComps }
    </div>
  )
}

function SectionList ({ sections, width }) {
  return (
    <div
      style={{
        padding: '.5vw',
        border: '1px solid #D9D9D9',
        borderRadius: '10px',
        width: width,
        marginRight: '0.5vw',
      }} 
    >
    {
      sections.map((section, index) => {
        section.key=index;
        return Section(section)
      })
    }
    </div>
  )
}


/// Practitioner ///

const matchVals = (commCats, practCats) => {
  return commCats.map(commCat => practCats.includes(commCat))
}
 
function PractMatchList ({ community, practitioner, width }) {

  const sections = [
    [ [community.State], practitioner.State ],
    [ community.Activities, practitioner.Activities ],
    [ community.Sectors, practitioner.Sectors ],
    [ community.Hazards, practitioner.Hazards ],
    [ [community.Size], practitioner.Size ],
  ]
    .map(([ commCats, practCats ]) => matchVals(commCats, practCats))
    .map(matches => {
      return {
        type: 'practitioner',
        cards: matches
      }
    })

  return (
    <div
      style={{
        width: width
      }}
    >
      <HeaderCell
        content={ practitioner['Organization Name'] }
        type='practitioner'
        linkPath={ `/#/${practitioner.Id}`}
      ></HeaderCell>
      <SectionList
        sections= { sections }
      ></SectionList>
    </div>
  )
}

function PractMatchSymbol({ label }) {
  // label is a boolean
  return (
    <>
    {
      label
        ? <PractMatchSvg></PractMatchSvg>
        : <PractNoMatchSvg></PractNoMatchSvg>
    }
    </>
  )
}

function PractMatchSvg() {
  return (
    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM21 15.4H7V12.6H21V15.4Z" fill="#FC8A79"/>
    </svg>
  )
}

function PractNoMatchSvg({ length }) {
  return (
    <svg
      width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.064 0 0 8.064 0 18C0 27.936 8.064 36 18 36C27.936 36 36 27.936 36 18C36 8.064 27.936 0 18 0ZM14.4 27L5.4 18L7.938 15.462L14.4 21.906L28.062 8.244L30.6 10.8L14.4 27Z" fill="#677D66" />
    </svg>
  )
}

function PractitionerPanel({ community, practitioners, listWidth }) {
  const practMatchLists = practitioners.map(pract => {
    return <PractMatchList
      community={ community }
      practitioner={ pract }
      width={ listWidth }
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


/// Community Panel ///

function CommunityCategoryList({ community }) {
  const sections = [
    {
      header: 'State',
      cards: [ community.State ]
    },
    {
      header: 'Activities',
      cards: community.Activities
    },
    {
      header: 'Sectors',
      cards: community.Sectors
    },
    {
      header: 'Hazards',
      cards: community.Hazards
    },
    {
      header: 'Size',
      cards: [ community.Size ]
    }
  ]
    .map(section => {
      section.type = 'community'
      return section
    })

  return (
    <SectionList
      sections={ sections }
    ></SectionList>
  )
}

function CommunityPanel({ community, width }) {
  return (
    <div
      width={ width }
      style={{
        flex: 1
      }}
    >
      <HeaderCell
        content={ community.Name }
        type='community'
      ></HeaderCell>
      <CommunityCategoryList
        community={ community } 
      ></CommunityCategoryList>
    </div>
  )
}

function PageHeader({ selectedCommunity, communities, setCommunity }) {

  function handleChange(e) {
    console.log(e)
    const newSelected = communities.filter(comm => comm.Name === e.target.value)[0]
    setCommunity(newSelected)
  }

  const items = communities.map(comm => {
    return (
      <MenuItem value={comm.Name}>{ comm.Name }</MenuItem>
    )
  })

  return (
    <>
      <h2>CRF Matching Tool</h2>
      <FormControl fullWidth>
        <InputLabel id="communities-select-label">Community</InputLabel>
        <Select
          labelId="communities-select-label"
          id="communities-select"
          value={ selectedCommunity.Name }
          label="Community"
          onChange={handleChange}
        >
          { items }
        </Select>
      </FormControl>
      <Divider
        style={{
          margin: '2vh'
        }} 
      ></Divider>
    </>
  )
}

/// Match Page (Loaded) ///

function MatchPageLoaded({ community, practitioners, selectedCommunity, communities, setCommunity }) {
  
  // styling stuff
  const commCatListWidthRaw = 35
  const practMatchListWidthRaw = parseInt((100 - commCatListWidthRaw) / practitioners.length)
  const commCatListWidth = `${commCatListWidthRaw}vw`
  const practMatchListWidth = `${practMatchListWidthRaw}vw`
  const headerMinHeight = '5vh'

  return (
    <>
      <PageHeader
        selectedCommunity={ selectedCommunity }
        communities={ communities }
        setCommunity={ setCommunity }
      >
      </PageHeader>
      <div
        style={{
          display: 'flex'
        }}
      >
          <CommunityPanel
            community={ community } 
            width={ commCatListWidth }
            headerMinHeight={ headerMinHeight }
          ></CommunityPanel>

          <PractitionerPanel
            community={ community }
            practitioners={ practitioners }
            listWidth={ practMatchListWidth }
            headerMinHeight={ headerMinHeight }
          ></PractitionerPanel>
      </div>
    </>
  )
}


/// Match Page ///

function MatchPage() {

  const [ allCommunities, setAllCommunities ] = useState([])
  const [ community, setCommunity ] = useState(false)
  const [ practitioners, setPractitioners ] = useState([])

  useEffect(() => {
    fetchAllCommunities(setAllCommunities, setCommunity)
  }, [])

  useEffect(() => {
    if (allCommunities.length) {
      fetchPractitionersForCommunity(community['Airtable Record ID'], setPractitioners)
    }
  }, [community])

  if (community && allCommunities.length && practitioners.length) {
    console.log('Rendering...')
    return (
      <div
        style={{
          ...styles.global,
        }}
      >
        <MatchPageLoaded
          community={ community }
          practitioners={ practitioners }
          communities={ allCommunities }
          selectedCommunity={ community }
          setCommunity={ setCommunity }
        ></MatchPageLoaded>
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

export default MatchPage