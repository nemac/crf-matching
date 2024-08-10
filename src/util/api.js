// Airtable
import Airtable from 'airtable'


Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__
})

const base = Airtable.base(__AIRTABLE_BASE__)

// practitioner ID is the "ID" field in airtable
export const fetchPractitioner = (practitionerId, setPractitioner) => {
  base('Practitioner').select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `{Id} = '${practitionerId}'`,
    fields: [
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
    console.log('Setting practitioner to')
    const rec = records
      .map(rec => rec.fields)
      .map(rec => {
        rec.Name = rec.Name || '',
        rec.State = rec.State || [],
        rec.Size = rec.Size || [],
        rec.Activities = rec.Activities || [],
        rec.Sectors = rec.Sectors || [],
        rec.Hazards = rec.Hazards || []
        return rec
      })[0]
    console.log(rec)
    setPractitioner(rec)
  }) 
}

export const fetchAllCommunities = (setAllCommunities, setCommunity) => {
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


export const fetchPractitionersForCommunity = (airtableRecordCommunity, setPractitioners) => {
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
