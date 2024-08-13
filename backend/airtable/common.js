
const matchTypes = [ 'State', 'Hazards', 'Activities', 'Size', 'Sectors' ];
const matchTables = [ 'Community', 'Practitioner', 'Matches' ];

// Mapping of match types to corresponding field names in each table
const matchTypesByTable = {
  'Community': {
    'State': 'State',
    'Hazards': 'Hazards',
    'Activities': 'Activities',
    'Size': 'Size',
    'Sectors': 'Sectors'
  },
  'Practitioner': {
    'State': 'State',
    'Hazards': 'Hazards',
    'Activities': 'Activities',
    'Size': 'Size',
    'Sectors': 'Sectors'
  },
  'Matches': {
    'State': 'Match: State',
    'Hazards': 'Match: Hazards',
    'Activities': 'Match: Activities',
    'Size': 'Match: Size',
    'Sectors': 'Match: Sectors'
  }
}

// Each table may have a different field name for a given match type
// Get the field name for some match type in a given table.
async function getFieldNameForMatchType(tableName, matchType) {
  const result = matchTypesByTable[tableName][matchType];
  if (!result) {
    throw new Error(`Could not find a field name for match type ${matchType} in table ${tableName}`);
  }
  return result;
}

async function getMatchFieldsForTable(table) {
  return Object.values(matchTypesByTable[table]);
}
