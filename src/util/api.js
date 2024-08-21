// Airtable
import Airtable from 'airtable'

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__
})
const base = Airtable.base(__AIRTABLE_BASE__)


/// configuration ///

const normalizeRec = (rec, fieldMap) => {
  const result = {}
  for (const [normKey, airKey] of Object.entries(fieldMap)) {
    result[normKey] = rec[airKey] || ''
  }
  return result
}

const practitionerFieldMap = {
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
  name: 'Linked Form - Name',
  org: 'Organization Name',
  website: 'Organization Website',
  linkedIn: 'Review: LinkedIn',
  email: 'Email',
  phone: 'Phone Number',
  strTrained: 'Have You Completed The N O A A Steps To Resilience Training?',
  id: 'Id',
}

const communityFieldMap = {
  airtableRecId: 'Airtable Record ID',
  name: 'Name',
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
  id: 'Id'
}

const practFetchFields = Object.values(practitionerFieldMap);
const communityFetchFields = Object.values(communityFieldMap);


/// api ///

export const fetchPractitioner = (practitionerId, setPractitioner) => {
  base('Practitioner').select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `{Id} = '${practitionerId}'`,
    fields: practFetchFields
  }).firstPage(function(err, records) {
    if (err) {
      console.error(err)
    }
    console.log('Setting practitioner to')
    const rec = records
      .map(rawRec => rawRec.fields)
      .map(rec => normalizeRec(rec, practitionerFieldMap))[0]
    console.log(rec)
    setPractitioner(rec)
  })
}

export const fetchCommunity = (communityId, setCommunity) => {
  base('Community').select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `{Id} = '${communityId}'`,
    fields: communityFetchFields,
  }).firstPage(function(err, records) {
    if (err) {
      console.error(err)
    }
    console.log('Setting community to')
    const rec = records
      .map(rawRec => rawRec.fields)
      .map(rec => normalizeRec(rec, communityFieldMap))
      // add total of categories
      .map(rec => {
        rec.totalCategories = rec.activities.length +
          rec.sectors.length +
          rec.hazards.length +
          2 // size + state
        return rec;
      })[0]
    console.log(rec)
    setCommunity(rec)
  })
}

export const fetchAllCommunities = (setAllCommunities) => {
  const communities = []
  base('Community').select({
    view: "Grid view",
    fields: communityFetchFields
  }).eachPage(function page(records, fetchNextPage) {
    const recs = records
      .map(rawRec => rawRec.fields)
      .map(rec => normalizeRec(rec, communityFieldMap))
    communities.push(...recs)
    fetchNextPage();
  }, function done(err) {
      if (err) { console.error(err); return; }
      setAllCommunities(communities)
  });
}


export const fetchPractitionersForCommunity = (communityId, setPractitioners) => {
  base('Matches').select({
    maxRecords: 5,
    view: "Grid view",

    // Curated only
    filterByFormula: `AND({Community: Id} = '${communityId}', {Curated})`,

    // For testing - get all even if not curated
    //  filterByFormula: `{Community: Id} = '${communityId}'`,
    fields: [
      'Practitioner: Airtable Record ID',
      'Practitioner: Id',
      'Match Score',
    ]
  }).firstPage(function(err, matchRecs) {
    matchRecs = matchRecs.map(rec => rec.fields)
    if (err) {
      console.error(err)
    }
    const practIdFormulaSegments = matchRecs
      .map(rec => rec['Practitioner: Airtable Record ID'])
      .map(recId => `{Airtable Record ID} = '${recId}'`)
      .join(',')
    const formula = `OR(${practIdFormulaSegments})`

    base('Practitioner').select({
      // maxRecords: 5,
      view: "Grid view",
      filterByFormula: formula,
      fields: practFetchFields,
    }).firstPage(function(err, pracRecs) {
      if (err) {
        console.error(err)
      }

      console.log('Setting practitioners to')
      const recs = pracRecs
        .map(rawRec => rawRec.fields)
        .map(rec => normalizeRec(rec, practitionerFieldMap))
        // insert match score manually
        .map(rec => {
          const filterById = rec.matchScore = matchRecs
            .filter(mRec => {
              const result = mRec['Practitioner: Id'][0] === rec.id
              return result;
            })
          rec.matchScore = filterById[0]['Match Score']
          return rec
        })
        // sort by match score (descending)
        .sort((r1, r2) => r2.matchScore - r1.matchScore)

      console.log(recs)

      // for testing - shuffle result
      // shuffle(recs)
      // for testing - limit to three when testing with non-curated
      // const result = recs.slice(0, 3)
      const result = recs

      setPractitioners(result)
    })
  })
}
