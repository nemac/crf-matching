// Airtable
import { Category } from '@mui/icons-material';
import Airtable from 'airtable';
import { practitionerFieldMap } from '../config/config.js';

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__,
});
const base = Airtable.base(__AIRTABLE_BASE__);

/// configuration ///
const practitionerViewName = 'RegistryPractitionerAndSpecialistsToolView'; //'RegistryToolView' // 'Grid view'
const specialistsViewName = 'RegistrySpecialistToolView'; //'RegistryToolView' // 'Grid view'
const PractitionerPageViewName = 'RegistryForPractitionerPageToolView'; // 'Grid view'

const normalizeRec = (rec, fieldMap) => {
  const result = {};
  for (const [normKey, airKey] of Object.entries(fieldMap)) {
    // For communities, ensure every field is an array
    if (fieldMap === communityFieldMap) {
      // If the field exists but isn't an array, wrap it
      result[normKey] = rec[airKey]
        ? Array.isArray(rec[airKey])
          ? rec[airKey]
          : [rec[airKey]]
        : []; // If field doesn't exist, return empty array
    } else {
      result[normKey] = rec[airKey] || '';
    }
  }
  return result;
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

function buildAirtableFilterFormula(
  criteriaObject,
  fieldMap,
  operator = 'AND'
) {
  const mainConditions = [];

  // Loop through each key (activities, sectors, etc.) in the criteria object
  for (const [criteriaKey, valuesArray] of Object.entries(criteriaObject)) {
    // 1. Get the actual Airtable field ID using the map
    const airtableFieldId = fieldMap[criteriaKey];

    // Skip if the array is empty OR if the key doesn't exist in the map
    if (
      !airtableFieldId ||
      !Array.isArray(valuesArray) ||
      valuesArray.length === 0
    ) {
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
    const fieldCondition = `${operator}(${conditions.join(', ')})`;

    mainConditions.push(fieldCondition);
  }

  // If no conditions were generated, return an empty string (no filter)
  if (mainConditions.length === 0) {
    return '';
  }

  // Combine all field conditions using AND()
  return `${operator}(${mainConditions.join(', ')})`;
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
    .firstPage((err, records) => {
      if (err) {
        console.error(err);
      }
      const rec = records
        .map(rawRec => rawRec.fields)
        .map(rec => normalizeRec(rec, practitionerFieldMap))[0];
      setPractitioner(rec);
    });
};

export const fetchTotalPractitionerCount = setCount => {
  base('Organization')
    .select({
      view: practitionerViewName,
      fields: [],
    })
    .all()
    .then(records => {
      // The result is ready here, so we call the setter function.
      setCount(records.length);
    })
    .catch(err => {
      console.error(
        'An error occurred while fetching the total record count:',
        err
      );
      // On error, set the count to 0 or handle as needed.
      setCount(0);
    });
};

export const fetchFilteredSpecialist = (filters, setPractitioners) => {
  const filterFormula = buildAirtableFilterFormula(
    filters,
    practitionerFieldMap,
    'OR'
  );

  base('Organization')
    .select({
      view: specialistsViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      filterByFormula: filterFormula,
    })
    .all()
    .then(records => {
      const categoryFieldKey = practitionerFieldMap['org_registry_category'];

      // Initialize the separation objects
      const specialists = [];

      // Process each record
      records.forEach(record => {
        const normalizedRecord = normalizeRec(
          record.fields,
          practitionerFieldMap
        );

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
};

export const fetchFilteredPractitioners = (filters, setPractitioners) => {
  // Helper function to calculate match count
  const fieldsToCheck = ['state', 'activities', 'hazards', 'size', 'sectors'];
  
  const calculateMatchCount = (practitioner) => {
    let count = 0;
    
    for (const field of fieldsToCheck) {
      if (filters[field] && filters[field].length > 0) {
        const practitionerValues = practitioner[field];
        const practitionerArray = Array.isArray(practitionerValues)
          ? practitionerValues
          : (practitionerValues ? [practitionerValues] : []);
        
        // Count how many filter values exist in this practitioner's field
        filters[field].forEach(filterValue => {
          if (practitionerArray.includes(filterValue)) {
            count++;
          }
        });
      }
    }
    
    return count;
  };

  // Helper function to sort and randomize practitioners
  const sortAndRandomize = (practitioners) => {
    const practitionersWithCounts = practitioners.map(prac => {
      const matchCount = calculateMatchCount(prac);
      return {
        practitioner: { ...prac, matchCount },
        matchCount
      };
    });

    // Sort by match count descending
    practitionersWithCounts.sort((a, b) => b.matchCount - a.matchCount);

    // Group by match count and randomize within each group (for ties)
    const grouped = {};
    practitionersWithCounts.forEach(item => {
      if (!grouped[item.matchCount]) {
        grouped[item.matchCount] = [];
      }
      grouped[item.matchCount].push(item);
    });

    // Randomize each group and flatten back to practitioners
    return Object.values(grouped)
      .map(group => group.sort(() => Math.random() - 0.5))
      .flat()
      .map(item => item.practitioner);
  };

  // Fetch specialists with OR operator
  const specialistsFilterFormula = buildAirtableFilterFormula(
    filters,
    practitionerFieldMap,
    'OR'
  );

  // Fetch broad service providers with AND operator
  const broadFilterFormula = buildAirtableFilterFormula(
    filters,
    practitionerFieldMap,
    'AND'
  );

  let specialistsData = [];
  let broadData = [];
  let completedRequests = 0;

  const combineAndReturn = () => {
    completedRequests++;
    if (completedRequests === 2) {
      // Both requests are done, merge and sort by match count descending
      const allPractitioners = [...specialistsData, ...broadData];
      
      // Sort all practitioners by match count descending
      allPractitioners.sort((a, b) => {
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;
        }
        // For same match count, randomize
        return Math.random() - 0.5;
      });
      
      setPractitioners(allPractitioners);
    }
  };

  // Fetch specialists
  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      filterByFormula: specialistsFilterFormula,
    })
    .all()
    .then(records => {
      const categoryFieldKey = practitionerFieldMap['org_registry_category'];
      const specialists = [];

      records.forEach(record => {
        const normalizedRecord = normalizeRec(
          record.fields,
          practitionerFieldMap
        );

        // Only include if category is Specialist
        const recordCategory = record.fields[categoryFieldKey];
        if (recordCategory === 'Specialist') {
          const matchCount = calculateMatchCount(normalizedRecord);
          specialists.push({ ...normalizedRecord, matchCount });
        }
      });

      specialistsData = specialists;
      combineAndReturn();
    })
    .catch(err => {
      console.error('An error occurred while fetching specialists:', err);
      combineAndReturn();
    });

  // Fetch broad service providers
  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      filterByFormula: broadFilterFormula,
    })
    .all()
    .then(records => {
      const categoryFieldKey = practitionerFieldMap['org_registry_category'];
      const broadServiceProviders = [];

      records.forEach(record => {
        const normalizedRecord = normalizeRec(
          record.fields,
          practitionerFieldMap
        );

        // Only include if category is Broad service provider
        const recordCategory = record.fields[categoryFieldKey];
        if (recordCategory === 'Broad service provider') {
          const matchCount = calculateMatchCount(normalizedRecord);
          broadServiceProviders.push({ ...normalizedRecord, matchCount });
        }
      });

      broadData = broadServiceProviders;
      combineAndReturn();
    })
    .catch(err => {
      console.error('An error occurred while fetching broad service providers:', err);
      combineAndReturn();
    });
};

export const fetchOptionsFromAirtable = setOptions => {
  base('Options')
    .select({
      view: 'Grid view',
      fields: ['State', 'Activities', 'Hazards', 'Size', 'Sectors'],
      maxRecords: 200, // Only fetch up to 200 records
    })
    .firstPage((err, records) => {
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
      records.forEach(record => {
        const { fields } = record;

        // Add values to respective sets if they exist
        if (fields.State) availableOptions.state.add(fields.State);
        if (fields.Activities) {
          (Array.isArray(fields.Activities)
            ? fields.Activities
            : [fields.Activities]
          ).forEach(activity => availableOptions.activities.add(activity));
        }
        if (fields.Hazards) {
          (Array.isArray(fields.Hazards)
            ? fields.Hazards
            : [fields.Hazards]
          ).forEach(hazard => availableOptions.hazards.add(hazard));
        }
        if (fields.Size) availableOptions.size.add(fields.Size);
        if (fields.Sectors) {
          (Array.isArray(fields.Sectors)
            ? fields.Sectors
            : [fields.Sectors]
          ).forEach(sector => availableOptions.sectors.add(sector));
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
