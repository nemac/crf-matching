import { useState, useLayoutEffect, useEffect } from 'react'
import Airtable from 'airtable'

import { CommunityPanel, PractitionerPanel } from './components/MatchPage';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__
})

const base = Airtable.base(__AIRTABLE_BASE__)

const fetchCommunity = (airtableRecord, setCommunity) => {
  base('Community').select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `IF(RECORD_ID() = '${airtableRecord}', TRUE(), FALSE())`,
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
    const result = records[0].fields
    result.Name = result.Name || ''
    result.State = result.State || ''
    result.Size = result.Size || ''
    result.Activities = result.Activities || []
    result.Sectors = result.Sectors || []
    result.Hazards = result.Hazards || []
    console.log('Setting community to')
    console.log(result)
    setCommunity(result)
  })
}

const fetchPractitioners = (airtableRecordCommunity, setPractitioners) => {
  base('Matches').select({
    maxRecords: 5,
    view: "Grid view",
    filterByFormula: `AND({Community: Airtable Record ID} = '${airtableRecordCommunity}', {Curated})`,
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
      const result = records
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
      console.log(result)
      setPractitioners(result)
    })
  })
}


function MatchPage({ community, practitioners }) {

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

function App() {

  const [ community, setCommunity ] = useState(false)
  const [ practitioners, setPractitioners ] = useState([])

  useEffect(() => {
    fetchCommunity('recyglyS9GKhGWm6G', setCommunity)
    fetchPractitioners('recyglyS9GKhGWm6G', setPractitioners)
  }, [])

  if (community && practitioners.length) {
    console.log('Rendering...')
    return (
      <MatchPage
        community={ community }
        practitioners={ practitioners }
      ></MatchPage>
    )
  } else {
    console.log('Loading...')
    return (
      <h3>Loading...</h3>
    )
  }

}

export default App

