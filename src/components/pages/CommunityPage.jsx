// styles
import styles from '../../styles'

// React
import { useRef, useState, useLayoutEffect } from 'react'

// router
import { useParams } from 'react-router-dom'

// API
import { fetchCommunity, fetchPractitionersForCommunity } from '../../util/api'

// components
import FullPageSpinner from '../FullPageSpinner';
import GradCapSvg from '../GradCapSvg';
import ProfilePopper from '../ProfilePopper';

/// Styles ///

const sectionStyles = {
  marginRight: '5px',
  marginLeft: '5px',
}

const sectionHeaderStyles = {
  height: '200px',
  alignContent: 'center',
  textAlign: 'center',
  ...sectionStyles
}

const scoreSectionStyles = {
  ...sectionStyles,
  marginTop: '50px',
  fontSize: '1.3em'
}


/// Headers ///

function StrTrained({ isTrained }) {
  const trainedStyle = {
    height: '45px',
    marginTop: '10px',
  }
  if (isTrained === 'Yes') {
    return <div
      style={{
        ...trainedStyle,
        borderRadius: '15px',
        backgroundColor: styles.colors.darkBlue,
        color: styles.colors.lightGray,
        display: 'flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '.8em',
      }} 
    >
      <div>
        <GradCapSvg></GradCapSvg>
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
        backgroundColor: styles.colors.lightGray,
      }} 
    >

    </div>
  }
}

/// Sections ///

function Cell ({ label, type, key }) {
  return (
    <div
      key={ key }
      style={{
        borderRadius: '10px',
        backgroundColor: styles.colors.tan,
        padding: '25px',
        marginBottom: '5px',
        verticalAlign: 'top',
        fontSize: '.9em',
        textAlign: type === 'community' ? 'left' : 'center',
        // keep row alignment on small screens
        height: '20px'
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

function SectionList ({ sections, type, score }) {
  const scoreSection = type === 'community'
    ? <CommunityTotal totalCategories={ score }></CommunityTotal>
    : <PractitionerScore score={ score }></PractitionerScore>

  return (
    <div
      style={{
        padding: '10px',
        border: `1px solid ${styles.colors.borderGray }`,
        borderRadius: '15px',
        ...sectionStyles
      }} 
    >
      {
        sections.map((section, index) => {
          section.key=index;
          return Section(section)
        })
      }
      { scoreSection }
    </div>
  )
}



/// Practitioner ///


function PractitionerHeader({
  content,
  linkPath,
  strTrained,
  practitioner,
  poppedPractitioner,
  setPoppedPractitioner
}) {

  const headerRef = useRef(null);

  const onMouseEnter = e => {
    setPoppedPractitioner(practitioner)
  }

  const header = <div
    ref={ headerRef }
    style={{
      ...sectionHeaderStyles,
      fontSize: '1.2em',
    }}
    onMouseEnter={ onMouseEnter }
  >
    { content || '(Org Name Not Found)' }
    <StrTrained isTrained={ strTrained }></StrTrained>
    <ProfilePopper
      headerRef={ headerRef }
      practitioner={ practitioner }
      poppedPractitioner={ poppedPractitioner }
      setPoppedPractitioner={ setPoppedPractitioner }
    ></ProfilePopper>
  </div>

  return (
    <>
      { header }
    </>
  )
}



const matchVals = (commCats, practCats) => {
  return commCats.map(commCat => practCats.includes(commCat))
}

function PractitionerScore({ score }) {
  return <div
    style={{
      ...scoreSectionStyles,
      textAlign: 'center',
    }} 
  >
    { score } 
  </div>
}
 
function PractMatchList ({
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
        type: 'practitioner',
        cards: matches
      }
    })

  return (
    <div
      style={{
        flex: '1 1 33%',
        backgroundColor: styles.colors.lightGray,
      }}
    >
      <PractitionerHeader
        practitioner={ practitioner }
        content={ practitioner.org || practitioner.name }
        linkPath={ `#/practitioner/${practitioner.id}`}
        strTrained={ practitioner.strTrained }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
      ></PractitionerHeader>
      <SectionList
        type="practitioner"
        score={ practitioner.matchScore }
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
    <svg
      width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 0C8.064 0 0 8.064 0 18C0 27.936 8.064 36 18 36C27.936 36 36 27.936 36 18C36 8.064 27.936 0 18 0ZM14.4 27L5.4 18L7.938 15.462L14.4 21.906L28.062 8.244L30.6 10.8L14.4 27Z"
        fill={ styles.colors.matchGreen }
      />
    </svg>
  )
}

function PractNoMatchSvg({ length }) {
  // red circle with a hollow dash in the middle
  return (
    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM21 15.4H7V12.6H21V15.4Z"
      fill={ styles.colors.nomatchRed }
    />
    </svg>

  )
}

function PractitionerPanel({ community, practitioners }) {

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


/// Community Panel ///

function CommunityHeader({ label }) {
  return (
    <div
      style={{
        ...sectionHeaderStyles,
        fontSize: '2em',
      }}
    >{ label }</div>
  )

}



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
      type="community"
      score={ community.totalCategories }
      sections={ sections }
    ></SectionList>
  )
}

function CommunityTotal({ totalCategories }) {
  return (
    <div
      style={{
        ...scoreSectionStyles
      }}
    >
      Total
      <div style={{ float: 'right' }}>{ totalCategories }</div>
    </div>
  )
}

function CommunityPanel({ community }) {
  return (
    <div
      style={{
        backgroundColor: styles.colors.white,
        borderRadius: '15px',
        border: `0px solid ${styles.colors.white}`,
        paddingBottom: '10px',
      }} 
    >
      <CommunityHeader
        label={ community.name }
      ></CommunityHeader>
      <CommunityCategoryList
        community={ community } 
      ></CommunityCategoryList>
    </div>
  )
}

/// Match Page (Loaded) ///

function MatchPageLoaded({ community, practitioners }) {
  
  return (
    <>
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