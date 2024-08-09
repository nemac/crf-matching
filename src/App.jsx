
// React
import { useState, useEffect } from 'react'

// Material UI
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'

// Airtable
import Airtable from 'airtable'

// Components
import { CommunityPanel, PractitionerPanel } from './components/MatchPage';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__
})

const base = Airtable.base(__AIRTABLE_BASE__)

const fetchAllCommunities = (base, setAllCommunities, setCommunity) => {
  const communities = []
  base('Community').select({
    view: "Grid view",
    fields: [
      'Airtable Record ID',
      'Name',
      'State',
      'Size',
      'Activities',
      'Sectors',
      'Hazards',
    ]
  }).eachPage(function page(records, fetchNextPage) {
    const recs = records.map(rec => {
      const result = rec.fields
      result.Name = result.Name || ''
      result.State = result.State || ''
      result.Size = result.Size || ''
      result.Activities = result.Activities || []
      result.Sectors = result.Sectors || []
      result.Hazards = result.Hazards || []
      return result
    })
    communities.push(...recs)
    fetchNextPage();
}, function done(err) {
    if (err) { console.error(err); return; }
    setAllCommunities(communities)

    // for testing
    //const commRecId = 'recyglyS9GKhGWm6G'
    //const community = communities.filter(rec => rec['Airtable Record ID'] === commRecId)[0]
    const community = communities[0]
    setCommunity(community)
});
}


const fetchPractitionersForCommunity = (base, airtableRecordCommunity, setPractitioners) => {
  base('Matches').select({
    maxRecords: 5,
    view: "Grid view",

    // Curated only
    //filterByFormula: `AND({Community: Airtable Record ID} = '${airtableRecordCommunity}', {Curated})`,

    // For testing - get all even if not curated
    filterByFormula: `AND({Community: Airtable Record ID} = '${airtableRecordCommunity}', TRUE())`,
    fields: [
      'Practitioner: Airtable Record ID',
    ]
  }).firstPage(function(err, records) {
    if (err) {
      console.error(err)
    }
    const practIdFormulaSegments = records
      .map(rec => rec.fields['Practitioner: Airtable Record ID'])
      .map(recId => `{Airtable Record ID} = '${recId}'`)
      .join(',')

    const formula = `OR(${practIdFormulaSegments})`
    base('Practitioner').select({
      maxRecords: 5,
      view: "Grid view",
      filterByFormula: formula,
      fields: [
        'Name',
        'State',
        'Size',
        'Activities',
        'Sectors',
        'Hazards',
      ]
    }).firstPage(function(err, records) {
      if (err) {
        console.error(err)
      }
      console.log('Setting practitioners to')
      const recs = records
        .map(rec => rec.fields)
        .map(rec => {
          rec.Name = rec.Name || '',
          rec.State = rec.State || [],
          rec.Size = rec.Size || [],
          rec.Activities = rec.Activities || [],
          rec.Sectors = rec.Sectors || [],
          rec.Hazards = rec.Hazards || []
          return rec
        })
      console.log(recs)

      // for testing - limit to three when testing with non-curated
      const result = recs.slice(0, 3)
      setPractitioners(result)
    })
  })
}


function MatchPage({ community, practitioners }) {

  // styling stuff
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

function App() {

  const [ allCommunities, setAllCommunities ] = useState([])
  const [ community, setCommunity ] = useState(false)
  const [ practitioners, setPractitioners ] = useState([])

  useEffect(() => {
    fetchAllCommunities(base, setAllCommunities, setCommunity)
  }, [])

  useEffect(() => {
    if (allCommunities.length) {
      fetchPractitionersForCommunity(base, community['Airtable Record ID'], setPractitioners)
    }
  }, [community])

  if (community && allCommunities.length && practitioners.length) {
    console.log('Rendering...')
    return (
      <>
        <PageHeader
          communities={ allCommunities }
          selectedCommunity={ community }
          setCommunity={ setCommunity }></PageHeader>
        <MatchPage
          community={ community }
          practitioners={ practitioners }
        ></MatchPage>
      </>
    )
  } else {
    console.log('Loading...')
    return (
      <h3>Loading...</h3>
    )
  }

}

export default App

