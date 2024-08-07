import { CommunityCategoryList, PractMatchList } from './components/MatchPage';

/// dummy data ///

const practitioners = [
  {
    State: [ 'California' ],
    Size: [ 'Under 5,000' ],
    Activities: [ 'Adaptation Planning' ],
    Sectors: [ 'Emergency preparedness' ],
    Hazards: [ 'Flooding – general'],
    StrTrained: false
  },
  {
    State: [ 'Arizona' ],
    Size: [ 'Under 5,000' ],
    Activities: [ 'Communicating and engaging' ],
    Sectors: [ 'Water' ],
    Hazards: [ 'Water quality'],
    StrTrained: false
  },
  {
    State: [ 'Arizona' ],
    Size: [ 'Under 5,000' ],
    Activities: [ 'Communicating and engaging' ],
    Sectors: [ 'Water' ],
    Hazards: [ 'Water quality'],
    StrTrained: false
  }
]

const community = {
  Name: 'Community Name',
  State: 'California',
  Activities: [ 'Adaptation Planning', 'Communicating and engaging', 'Integrating equity', 'Integrating equity', 'Taking action', 'Vulnerability assessment' ],
  Sectors: [ 'Emergency preparedness', 'Public health', 'Water' ],
  Hazards: [ 'Flooding – general', 'Flooding – rainfall-induced', 'Water quality' ],
  Size: 'Under 5,000'
}


function App() {

  const practMatchLists = practitioners.map(pract => {
    return <PractMatchList
      community={ community }
      practitioner={ pract }
      width='15vw'
      style={{
        flex: 1
      }}
    ></PractMatchList>
  })

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        display: 'flex'
      }}
    >
      <CommunityCategoryList
        community={ community } 
        width='35vw'
        style={{
          flex: 1
        }}
      ></CommunityCategoryList>

      { practMatchLists }

    </div>
  )
}

export default App

