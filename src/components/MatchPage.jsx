

/// Generic Components ///

function Card ({ label, type, key }) {
  return (
    <div
      key={ key }
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        backgroundColor: 'lightgreen',
        padding: '20px',
        marginBottom: '5px'
      }}
    >
    { type === 'community' ? label : PractMatchSymbol({ label }) }</div>
  )
}

function CatSection ({ header='', type, cards }) {
  const cardComps = cards.map((label, index) => Card({ label, type, key: index }))
  return (
    <div>
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
    { sections.map(section => CatSection(section)) }
    </div>
  )
}


/// Practitioner ///

function MatchSection({ commCats, practCats }) {

  return (
    <CatSection
      type='practitioner'
      cards={ commCats.map(commCat => practCats.includes(commCat)) }
    ></CatSection>
  )

}

function matchVals (commCats, practCats) {
  return commCats.map(commCat => practCats.includes(commCat))
}

export function PractMatchList ({ community, practitioner, width }) {

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
      <SectionList
        sections= { sections }
      ></SectionList>
    </div>
  )

}

function PractMatchSymbol({ label }) {
  // TODO use label as a boolean switch and display image represending match or no match
  return (
    <>{ String(label) }</>
  )
}


/// Community Panel ///

export function CommunityCategoryList({ community, width }) {
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

  return (
    <SectionList
      sections={ sections }
      width={ width }
    ></SectionList>
  )
}
