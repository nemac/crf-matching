/**
 * Generate matches for a match record.
 * 
 * This script can be used for both
 * "Create" and "Update" automations for match records.
 */



function getMultiselectVals(arrOrNull) {
  if (arrOrNull === null) return [];
  return arrOrNull.map(obj => obj.name);
}

function wrapMultiselectVals(strArr) {
  return strArr.map(function (str) {
    return { name: str }
  });
}

function formatStrArr(strArr) {
  return '\n  ' + strArr.join('\n  ');
}

function getTextVal(objOrNull) {
  if (objOrNull === null) return null;
  return objOrNull.name;
}

let inputConfig = input.config();

let matchRecId = inputConfig.matchRecId;

let commTable = base.getTable('Community');
let practTable = base.getTable('Practitioner');
let matchTable = base.getTable('Matches');

let matchRec = await matchTable.selectRecordAsync(matchRecId, { fields: [ 'Community', 'Practitioner' ] });
if (!matchRec) {
  throw new Error(`Matches record not found with airtable record ID ${matchRecId}`);
}

let commRecId = matchRec.getCellValue('Community')[0].id;
let practRecId = matchRec.getCellValue('Practitioner')[0].id;

let commMatchFields = await getMatchFieldsForTable('Community');
let commRec = await commTable.selectRecordAsync(commRecId, { fields: commMatchFields });
if (!commRec) {
  throw new Error(`Community record not found with airtable record ID ${commRecId}`);
}

let practMatchFields = await getMatchFieldsForTable('Practitioner');
let practRec = await practTable.selectRecordAsync(practRecId, { fields: practMatchFields });
if (!practRec) {
  throw new Error(`Practitioner record not found with airtable record ID ${practRecId}`);
}


/// matching ///

async function matchMultiselectToMultiselect(fieldName, practRec, commRec, matchRec) {
  console.log(`Running match process for '${fieldName}'`);
  let practFieldName = await getFieldNameForMatchType('Practitioner', fieldName);
  let commFieldName = await getFieldNameForMatchType('Community', fieldName);
  let matchesFieldName = await getFieldNameForMatchType('Matches', fieldName);
  let practVals = getMultiselectVals(practRec.getCellValue(practFieldName));
  let commVals = getMultiselectVals(commRec.getCellValue(commFieldName));
  let matchVals = practVals.filter(practVal => commVals.includes(practVal));
  console.log(`Community ${fieldName}: ${formatStrArr(commVals)}`);
  console.log(`Practioner ${fieldName}: ${formatStrArr(practVals)}`);
  console.log(`Setting 'Match: ${fieldName}' to ${formatStrArr(matchVals)}`);
  await matchTable.updateRecordAsync(matchRec, {
    [matchesFieldName]: wrapMultiselectVals(matchVals)
  });
  console.log(`Finished match process for ${fieldName}`);
}

// Community field = single select
// Practitioner field = multiselect
// Match field = single select
async function matchSingleSelectToMultiselect(fieldName, practRec, commRec, matchRec) {
  console.log(`Running match process for ${fieldName}`);
  let practFieldName = await getFieldNameForMatchType('Practitioner', fieldName);
  let commFieldName = await getFieldNameForMatchType('Community', fieldName);
  let matchesFieldName = await getFieldNameForMatchType('Matches', fieldName);
  let commVal = getTextVal(commRec.getCellValue(commFieldName));
  let practVals = getMultiselectVals(practRec.getCellValue(practFieldName));
  let matchVal = commVal;
  console.log(`Community ${fieldName}: ${commVal}`);
  console.log(`Practioner ${fieldName}: ${formatStrArr(practVals)}`);
  console.log(`Setting 'Match: ${fieldName}' to ${matchVal}`);
  await matchTable.updateRecordAsync(matchRec, {
    [matchesFieldName]: wrapMultiselectVals([commVal])[0]
  });
  console.log(`Finished match process for '${fieldName}'`);
}

// state
await matchSingleSelectToMultiselect('State', practRec, commRec, matchRec);

// size
await matchSingleSelectToMultiselect('Size', practRec, commRec, matchRec);

// activities
await matchMultiselectToMultiselect('Activities', practRec, commRec, matchRec);

// hazards
await matchMultiselectToMultiselect('Hazards', practRec, commRec, matchRec);

// sectors
await matchMultiselectToMultiselect('Sectors', practRec, commRec, matchRec);
