
/**
 * Variables defined in google script context:
 * 
 * AIRTABLE_API_KEY - personal token
 * AIRTABLE_BASE_ID - the random string in URL path, not the label
 * AIRTABLE_TABLE_NAME - label for the table i.e. "Practitioner" or "Practitioner (test)"
 * 
 */


// US States and territories
// If a practitioner selects "I work in all states..." option
// then this array is sent to airtable instead
const allStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia (DC)',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
  'American Samoa',
  'Guam',
  'Northern Mariana Islands',
  'Puerto Rico',
  'Virgin Islands'
];

/// Mappings for Normalization ///


const fieldList = [

  // state
  {
    airtableHeader: 'State',
    sourceHeader: 'What U - S -  States And Territories Does Your Organization Work In?',
    transformer: 'stringArray'
  },
  /*
  {
    airtableHeader: 'Review: State',
    sourceHeader: 'What U - S -  States And Territories Does Your Organization Work In?',
    transformer: 'stringArray'
  },
  */

  // activities
  {
    airtableHeader: 'Activities',
    sourceHeader: 'What Services Do You Provide?',
    transformer: 'stringArray'
  },
  /*
  {
    airtableHeader: 'Review: Activities',
    sourceHeader: 'What Services Do You Provide?',
    transformer: 'stringArray'
  },
  */

  // sectors
  {
    airtableHeader: 'Sectors',
    sourceHeader: 'What Sectors Do You Have Expertise In?',
    transformer: 'stringArray'
  },
  /*
  {
    airtableHeader: 'Review: Sectors',
    sourceHeader: 'What Sectors Do You Have Expertise In?',
    transformer: 'stringArray'
  },
  */

  // hazards
  {
    airtableHeader: 'Hazards',
    sourceHeader: 'What Climate Hazards Do You Have Expertise In?',
    transformer: 'stringArray'
  },
  /*
  {
    airtableHeader: 'Review: Hazards',
    sourceHeader: 'What Climate Hazards Do You Have Expertise In?',
    transformer: 'stringArray'
  },
  */

  // size
  {
    airtableHeader: 'Size',
    sourceHeader: 'What Size Communities Do You Have Experience Working With?',
    transformer: 'stringArray'
  },
  /*
  {
    airtableHeader: 'Review: Size',
    sourceHeader: 'What Size Communities Do You Have Experience Working With?',
    transformer: 'stringArray'
  },
  */

  // dates
  {
    airtableHeader: 'Folder Created',
    sourceHeader: 'Folder Created',
    transformer: 'date'
  },
  {
    airtableHeader: 'Folder Modified',
    sourceHeader: 'Folder Modified',
    transformer: 'date'
  },
  {
    airtableHeader: 'Created By User - Created',
    sourceHeader: 'Created By User - Created',
    transformer: 'date'
  },
  {
    airtableHeader: 'Created By User - Modified',
    sourceHeader: 'Created by User - Modified',
    transformer: 'date'
  },

];


/// Cell Validators & Transformers  ///

transformers = {
  'default': (val, airtableHeader) => String(val),
  'date': (val, airtableHeader) => (new Date(val)).toISOString(),
  'stringArray': (arr, airtableHeader) => {
    // special case for 'State' (option does not exist in airtable)
    if ((airtableHeader === 'State' || airtableHeader === 'Review: State') && arr.includes('I work in all U.S. state and territories')) {
      return allStates;
    }
    return arr.split('\n').map(rawVal => {
      // special case for 'Activities' (normalize value)
      if ((airtableHeader === 'Activities' || airtableHeader === 'Review: Activities') && rawVal.startsWith('Integrating equity')) {
        return 'Integrating equity';
      }
      // special case for 'Size' (normalize dash type)
      if (airtableHeader === 'Size' || airtableHeader === 'Review: Size') {
        return rawVal.replace('-', '–');
      }
      return rawVal;
    });
  }
}


/// Export to Airtable ///

/**
 * Send a batch of cleaned data to Airtable
 * @param {Array} records - The cleaned data to send to Airtable
 */
function sendToAirtable(records) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`
    },
    payload: JSON.stringify({ records })
  };
  
  const response = UrlFetchApp.fetch(url, options);
}

/**
 * Main
 */
function importDataToAirtable() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const allData = sheet.getDataRange().getValues();

  // test with a subset
  // const data = allData.slice(0, 5);

  // use all records
  const data = allData;

  // Remove headers from data
  const sourceHeaders = data.shift();

  const records = data.map(row => {
    const record = {};
    sourceHeaders.forEach((sourceHeader, index) => {
      rawVal = row[index];
      if (!rawVal) {
        return;
      }
      const fieldMaps = fieldList.filter(d => d.sourceHeader == sourceHeader)
      if (!fieldMaps.length) {
        // use default field map if no explicit field map exists
        // record maps to a single string field of the same name
        fieldMaps.push({
          sourceHeader: sourceHeader,
          airtableHeader: sourceHeader,
          transformer: 'default'
        })
      }
      fieldMaps.forEach(fieldMap => {
        const airtableHeader = fieldMap.airtableHeader;
        const type = fieldMap.transformer || 'default'
        const result = transformers[type](rawVal, airtableHeader)
        record[airtableHeader] = result
      })
      console.log(record)
    });
    return { fields: record };
  });
  
  for (let i=0; i<records.length; i=i+10) {

    // full batch size
    let end = i+10 > records.length ? records.length : i+10;

    // or test with two
    // let end = i+2 > records.length ? records.length : i+10;

    sendToAirtable(records.slice(i, end));
  }
  
}

/// Runtime ///
importDataToAirtable()