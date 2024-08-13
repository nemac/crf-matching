// styles
import styles from '../styles'

// React
import { useState, useLayoutEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// API
import { fetchCommunity, fetchPractitionersForCommunity } from '../util/api'

// components
import FullPageSpinner from './FullPageSpinner';


/// Generic Components ///

function HeaderCell({ content, type, linkPath }) {
  return (
    <div
      style={{
        minHeight: '22vh',
        fontSize: '1.5em',
        alignContent: 'center',
        textAlign: 'center',
        marginBottom: '2vh',
      }}
    >
    { type === 'community' ? content : HeaderCellPractBadge({ content, linkPath }) }
    </div>
  )
}

function HeaderCellPractBadge({ content, linkPath }) {
  return (
    <a
      style={{
        display: 'block',
        margin: 'auto',
        height: '22vh',
        width: '22vh',
        textAlign: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        color: 'white',
        textDecoration: 'none',
      }}
      href={ linkPath }
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#2D3F5D',
          borderRadius: '50%',
          border: '1px solid #D1E9FF',
        }} 
      >
        { /* STR trained */ }
        
        <div
          style={{
            marginTop: '25%',
            marginBottom: '10%',
          }}
          >{ content }</div>
          { /* simplified person icon */ }
          <svg width="25%" height="25%" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M36.475 26.6727C32.275 24.5227 26.825 22.7727 20.5 22.7727C14.175 22.7727 8.725 24.5227 4.525 26.6727C2.025 27.9477 0.5 30.5227 0.5 33.3227V40.2727H40.5V33.3227C40.5 30.5227 38.975 27.9477 36.475 26.6727ZM14.95 20.2727H26.05C29.075 20.2727 31.4 17.6227 31 14.6227L30.2 8.49771C29.425 3.7477 25.3 0.272705 20.5 0.272705C15.7 0.272705 11.575 3.7477 10.8 8.49771L10 14.6227C9.6 17.6227 11.925 20.2727 14.95 20.2727Z"
              fill="#D1E9FF"
            />
          </svg>

      </div>
    </a>
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
    [ [community.state], practitioner.state ],
    [ community.activities, practitioner.activities ],
    [ community.sectors, practitioner.sectors ],
    [ community.hazards, practitioner.hazards ],
    [ [community.size], practitioner.size ],
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
        content={ practitioner.org || practitioner.name }
        type='practitioner'
        linkPath={ `#/practitioner/${practitioner.id}`}
        strTrained={ practitioner.strTrained }
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
  // check mark in a circle
  return (
    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM21 15.4H7V12.6H21V15.4Z" fill="#FC8A79"/>
    </svg>
  )
}

function PractNoMatchSvg({ length }) {
  // red circle with a hollow dash in the middle
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
      cards: [ community.state ]
    },
    {
      header: 'Activities',
      cards: community.activities
    },
    {
      header: 'Sectors',
      cards: community.sectors
    },
    {
      header: 'Hazards',
      cards: community.hazards
    },
    {
      header: 'Size',
      cards: [ community.size ]
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
        content={ community.name }
        type='community'
      ></HeaderCell>
      <CommunityCategoryList
        community={ community } 
      ></CommunityCategoryList>
    </div>
  )
}

/// Match Page (Loaded) ///

function MatchPageLoaded({ community, practitioners }) {
  
  // styling stuff
  const commCatListWidthRaw = 35

  // fit all practititioners on the page
  const practMatchListWidthRaw = parseInt((100 - commCatListWidthRaw) / practitioners.length)

  const commCatListWidth = `${commCatListWidthRaw}vw`
  const practMatchListWidth = `${practMatchListWidthRaw}vw`
  const headerMinHeight = '5vh'

  return (
    <>
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

function CommunityPage() {

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
        <MatchPageLoaded
          community={ community }
          practitioners={ practitioners }
        ></MatchPageLoaded>
      </div>
    )
  } else {
    return (
      <FullPageSpinner></FullPageSpinner>
    )
  }

}

export default CommunityPage