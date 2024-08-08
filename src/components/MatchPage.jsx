

/// Generic Components ///

function HeaderCell({ content, type }) {
  return (
    <div
      style={{
        minHeight: '10vh',
        fontSize: '1.5em',
        alignContent: 'center',
        textAlign: 'center'
      }}
    >
    { content }
    </div>
  )
}

function Card ({ label, type, key }) {
  return (
    <div
      key={ key }
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        backgroundColor: 'lightgreen',
        padding: '25px',
        marginBottom: '5px',
        verticalAlign: 'top',
        fontSize: '1em',
        textAlign: type === 'community' ? 'left' : 'center',
        // keep row alignment on small screens
        maxHeight: '1vh'
      }}
    >
    { type === 'community' ? label : PractMatchSymbol({ label }) }</div>
  )
}

function CatSection ({ header='', type, cards, key }) {
  const cardComps = cards.map((label, index) => Card({ label, type, key: index }))
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
        padding: '10px',
        border: '2px solid black',
        borderRadius: '10px',
        width: width
      }} 
    >
    {
      sections.map((section, index) => {
        section.key=index;
        return CatSection(section)
      })
    }
    </div>
  )
}


/// Practitioner ///

function matchVals (commCats, practCats) {
  return commCats.map(commCat => practCats.includes(commCat))
}

export function PractMatchList ({ community, practitioner, width, headerMinHeight }) {

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
        minHeight={ headerMinHeight }
        content={ practitioner.Name }
        type='practitioner'
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
    <>{ label ?  '✓' : 'X' }</>
  )
}

export function PractitionerPanel({ community, practitioners, listWidth, headerMinHeight }) {
  const practMatchLists = practitioners.map(pract => {
    return <PractMatchList
      community={ community }
      practitioner={ pract }
      width={ listWidth }
      headerMinHeight={ headerMinHeight }
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



export function CommunityPanel({ community, width, headerMinHeight }) {
  return (
    <div
      width={ width }
      style={{
        flex: 1
      }}
    >
      <HeaderCell content={ community.Name } type='community'></HeaderCell>
      <CommunityCategoryList
        community={ community } 
      ></CommunityCategoryList>
    </div>
  )
}
