// Airtable
import Airtable from 'airtable'

// for testing
// shuffle practitioners
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__
})
const base = Airtable.base(__AIRTABLE_BASE__)


/// configuration ///

const normalizeValue = val => {
  if (Array.isArray(val)) {
    return val || []
  }
  return val || ''
}

const normalizeRecGeneric = (rec, fieldMap) => {
  const result = {}
  Object.keys(fieldMap).forEach(fieldName => {
    result[fieldName] = normalizeValue(rec[fieldMap[fieldName]])
  })
  return result
}

const getFetchFields = fields => Object.values(fields)

const confGenerator = fieldMap => {
  return {
    fetchFields: getFetchFields(fieldMap),
    normalizeRec: rec => normalizeRecGeneric(rec, fieldMap)
  }
}

const practitionerFieldMap = {
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
  name: 'Name',
  org: 'Organization Name',
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

const practitionerConf = confGenerator(practitionerFieldMap)
const communityConf = confGenerator(communityFieldMap)


/// api ///

export const fetchPractitioner = (practitionerId, setPractitioner) => {
  base('Practitioner').select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `{Id} = '${practitionerId}'`,
    fields: practitionerConf.fetchFields
  }).firstPage(function(err, records) {
    if (err) {
      console.error(err)
    }
    console.log('Setting practitioner to')
    const rec = records
      .map(rec => rec.fields)
      .map(practitionerConf.normalizeRec)[0]
    console.log(rec)
    setPractitioner(rec)
  })
}

export const fetchCommunity = (communityId, setCommunity) => {
  base('Community').select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `{Id} = '${communityId}'`,
    fields: communityConf.fetchFields
  }).firstPage(function(err, records) {
    if (err) {
      console.error(err)
    }
    console.log('Setting community to')
    const rec = records
      .map(rec => rec.fields)
      .map(communityConf.normalizeRec)[0]
    console.log(rec)
    setCommunity(rec)
  })
}

export const fetchAllCommunities = (setAllCommunities) => {
  const communities = []
  base('Community').select({
    view: "Grid view",
    fields: communityConf.fetchFields
  }).eachPage(function page(records, fetchNextPage) {
    const recs = records
      .map(rec => rec.fields)
      .map(communityConf.normalizeRec)
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
    //filterByFormula: `AND({Community: Airtable Record ID} = '${airtableRecordCommunity}', {Curated})`,

    // For testing - get all even if not curated
    filterByFormula: `{Community: Id} = '${communityId}'`,
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
      fields: practitionerConf.fetchFields
    }).firstPage(function(err, records) {
      if (err) {
        console.error(err)
      }

      console.log('Setting practitioners to')
      const recs = records
        .map(rec => rec.fields)
        .map(practitionerConf.normalizeRec)

      console.log(recs)

      // for testing - shuffle result
      shuffle(recs)
      // for testing - limit to three when testing with non-curated
      const result = recs.slice(0, 3)

      setPractitioners(result)
    })
  })
}
