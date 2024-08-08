import { CommunityPanel, PractitionerPanel } from './components/MatchPage';

/// dummy data ///

const practitioners = [
  {
    Name: 'Matthew',
    State: [ 'California' ],
    Size: [ 'Under 5,000' ],
    Activities: [ 'Adaptation Planning' ],
    Sectors: [ 'Emergency preparedness' ],
    Hazards: [ 'Flooding – general'],
    StrTrained: false
  },
  {
    Name: 'Dave',
    State: [ 'Arizona' ],
    Size: [ 'Under 5,000' ],
    Activities: [ 'Communicating and engaging' ],
    Sectors: [ 'Water' ],
    Hazards: [ 'Water quality'],
    StrTrained: true
  },
  {
    Name: 'Jeff',
    State: [ 'Arizona' ],
    Size: [ 'Under 5,000' ],
    Activities: [ 'Communicating and engaging' ],
    Sectors: [ 'Water' ],
    Hazards: [ 'Water quality'],
    StrTrained: false
  }
]

const community = {
  Name: 'Ian\'s Place',
  State: 'California',
  Activities: [ 'Adaptation Planning', 'Communicating and engaging', 'Integrating equity', 'Integrating equity', 'Taking action', 'Vulnerability assessment' ],
  Sectors: [ 'Emergency preparedness', 'Public health', 'Water' ],
  Hazards: [ 'Flooding – general', 'Flooding – rainfall-induced', 'Water quality' ],
  Size: 'Under 5,000'
}


function App() {

  const commCatListWidthRaw = 35
  const practMatchListWidthRaw = parseInt((100 - commCatListWidthRaw) / practitioners.length)
  const commCatListWidth = `${commCatListWidthRaw}vw`
  const practMatchListWidth = `${practMatchListWidthRaw}vw`
  const headerMinHeight = '5vh'

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
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
  )
}

export default App

