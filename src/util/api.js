// Airtable
import { Category } from '@mui/icons-material';
import Airtable from 'airtable';

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__,
});
const base = Airtable.base(__AIRTABLE_BASE__);

/// configuration ///
const practitionerViewName =  'RegistryPractitionerToolView'  //'RegistryToolView' // 'Grid view'
const specialistsViewName =  'RegistrySpecialistToolView'  //'RegistryToolView' // 'Grid view'
const PractitionerPageViewName = 'RegistryForPractitionerPageToolView' // 'Grid view'

const normalizeRec = (rec, fieldMap) => {
  const result = {};
  for (const [normKey, airKey] of Object.entries(fieldMap)) {
    // For communities, ensure every field is an array
    if (fieldMap === communityFieldMap) {
      // If the field exists but isn't an array, wrap it
      result[normKey] = rec[airKey] ? (Array.isArray(rec[airKey]) ? rec[airKey] : [rec[airKey]]) : []; // If field doesn't exist, return empty array
    } else {
      result[normKey] = rec[airKey] || '';
    }
  }
  return result;
};

// map to airtable fields
const practitionerFieldMap = {
  airtableRecId: 'org_airtable_record_id',
  state: 'org_states_territories',
  size: 'org_comm_size',
  activities: 'org_services_provided_other',
  sectors: 'org_sectors',
  hazards: 'org_climate_hazards',
  name: 'org_name',
  org: 'org_name',
  website: 'org_website',
  status: 'org_status',
  linkedIn: 'org_linkedin',
  email: 'org_contact_email',
  phone: 'org_contact_phone',
  strTrained: 'org_str',
  info: "org_description",
  organizationType: 'org_type',
  additionalInformation: 'org_description',
  specificTypesOfCommunities: 'org_comm_specialization',
  languageFluencies: 'org_languages',
  org_street: 'org_street',
  org_city: 'org_city',
  org_state: 'org_state',
  org_zip: 'org_zip',
  org_registry_category: 'org_registry_category',
  org_registry_category_specialist: 'org_registry_category_specialist',
  org_services_provided_top: 'org_services_provided_top',
  example1_title: 'example1_title',
  example1_description: 'example1_description',
  example1_links: 'example1_links',
  example1_location: 'example1_location',
  example1_engagement: 'example1_engagement',
  example1_equity: 'example1_equity',

  example2_title: 'example2_title',
  example2_description: 'example2_description',
  example2_location: 'example2_location',
  example2_engagement: 'example2_engagement',
  example2_equity: 'example2_equity',
  example2_links: 'example2_links',

  example3_title: 'example3_title',
  example3_description: 'example3_description',
  example3_location: 'example3_location',
  example3_engagement: 'example3_engagement',
  example3_equity: 'example3_equity',
  example3_links: 'example3_links',
  org_Registry_public: 'org_Registry_public',
};

const communityFieldMap = {
  airtableRecId: 'Airtable Record ID',
  name: 'Name',
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
};

const practFetchFields = Object.values(practitionerFieldMap);

function buildAirtableFilterFormula(criteriaObject, fieldMap, operator = 'AND') {
    const mainConditions = [];

    // Loop through each key (activities, sectors, etc.) in the criteria object
    for (const [criteriaKey, valuesArray] of Object.entries(criteriaObject)) {
        
        // 1. Get the actual Airtable field ID using the map
        const airtableFieldId = fieldMap[criteriaKey];

        // Skip if the array is empty OR if the key doesn't exist in the map
        if (!airtableFieldId || !Array.isArray(valuesArray) || valuesArray.length === 0) {
            continue;
        }

        // Build the AND condition for all values within this field
        const conditions = valuesArray.map(value => {
            const quotedValue = `"${value}"`; 
            
            // Generate the FIND condition using the actual airtableFieldId
            // The padding with commas ("," & {Field} & ",") is crucial for look-up/multiple-select fields
            return `FIND(${quotedValue}, "," & {${airtableFieldId}} & ",")`;
        });

        // Combine all checks for this field using operator (AND/OR)
        const fieldCondition = `${operator}(${conditions.join(", ")})`;
        
        mainConditions.push(fieldCondition);
    }

    // If no conditions were generated, return an empty string (no filter)
    if (mainConditions.length === 0) {
        return '';
    }

    // Combine all field conditions using AND()
    return `AND(${mainConditions.join(", ")})`;
}


/// api ///
export const fetchPractitioner = (practitionerId, setPractitioner) => {
  base('Organization')
    .select({
      maxRecords: 1,
      view: PractitionerPageViewName,
      filterByFormula: `{org_airtable_record_id} = '${practitionerId}'`,
      fields: practFetchFields,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
      }
      const rec = records.map((rawRec) => rawRec.fields).map((rec) => normalizeRec(rec, practitionerFieldMap))[0];
      setPractitioner(rec);
    });
};

export const fetchTotalPractitionerCount = (setCount) => {
    base('Organization')
        .select({
            view: practitionerViewName,
            fields: []
        })
        .all() 
        .then(records => {
            // The result is ready here, so we call the setter function.
            setCount(records.length);
        })
        .catch(err => {
            console.error('An error occurred while fetching the total record count:', err);
            // On error, set the count to 0 or handle as needed.
            setCount(0);
        });
  }

  export const fetchFilteredSpecialist = (filters, setPractitioners) => {
  const filterFormula = buildAirtableFilterFormula(filters, practitionerFieldMap, 'OR');

  base('Organization')
    .select({
      view: specialistsViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      filterByFormula: filterFormula
    }).all() 
      .then(records => {
          const categoryFieldKey = practitionerFieldMap['org_registry_category'];

          // Initialize the separation objects
          const specialists = [];

          // Process each record
          records.forEach(record => {
              const normalizedRecord = normalizeRec(record.fields, practitionerFieldMap);
              
              // Determine the category value using the mapped field key
              const recordCategory = record.fields[categoryFieldKey];
              // Separate based on category
              specialists.push(normalizedRecord);
          }); 
          setPractitioners(specialists);
      })
      .catch(err => {
          console.error('An error occurred while fetching all pages:', err);
          setPractitioners([]);
      });
}

export const fetchFilteredPractitioners = (filters, setPractitioners) => {
  const filterFormula = buildAirtableFilterFormula(filters, practitionerFieldMap);

  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      filterByFormula: filterFormula
    }).all() 
      .then(records => {
          const categoryFieldKey = practitionerFieldMap['org_registry_category'];

          // Initialize the separation objects
          const broadServiceProviders = [];

          // Process each record
          records.forEach(record => {
              const normalizedRecord = normalizeRec(record.fields, practitionerFieldMap);
              
              // Determine the category value using the mapped field key
              const recordCategory = record.fields[categoryFieldKey];
              // Separate based on category
              broadServiceProviders.push(normalizedRecord);
          }); 
          setPractitioners(broadServiceProviders);
      })
      .catch(err => {
          console.error('An error occurred while fetching all pages:', err);
          setPractitioners([]);
      });
}

export const fetchOptionsFromAirtable = (setOptions) => {
  base('Options')
    .select({
      view: 'Grid view',
      fields: ['State', 'Activities', 'Hazards', 'Size', 'Sectors'],
      maxRecords: 200, // Only fetch up to 200 records
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }

      // Initialize our options object with Sets for unique values
      const availableOptions = {
        state: new Set(),
        activities: new Set(),
        hazards: new Set(),
        size: new Set(),
        sectors: new Set(),
      };

      // Process records
      records.forEach((record) => {
        const fields = record.fields;

        // Add values to respective sets if they exist
        if (fields.State) availableOptions.state.add(fields.State);
        if (fields.Activities) {
          (Array.isArray(fields.Activities) ? fields.Activities : [fields.Activities]).forEach((activity) =>
            availableOptions.activities.add(activity)
          );
        }
        if (fields.Hazards) {
          (Array.isArray(fields.Hazards) ? fields.Hazards : [fields.Hazards]).forEach((hazard) =>
            availableOptions.hazards.add(hazard)
          );
        }
        if (fields.Size) availableOptions.size.add(fields.Size);
        if (fields.Sectors) {
          (Array.isArray(fields.Sectors) ? fields.Sectors : [fields.Sectors]).forEach((sector) =>
            availableOptions.sectors.add(sector)
          );
        }
      });

      // Define custom sort order for size
      const sizeOrder = [
        'Under 10k',
        '10k-50k',
        '50k-100k',
        '100k-200k',
        '200k-300k',
        '300k-400k',
        '400k-500k',
        'Over 500k',
      ];

      // Convert Sets to sorted arrays
      const options = {
        state: [...availableOptions.state].sort(),
        activities: [...availableOptions.activities].sort(),
        hazards: [...availableOptions.hazards].sort(),
        // Custom sort for size based on defined order
        size: [...availableOptions.size].sort((a, b) => {
          return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
        }),
        sectors: [...availableOptions.sectors].sort(),
      };

      setOptions(options);
    });
};