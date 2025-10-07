// Airtable
import Airtable from 'airtable';

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__,
});
const base = Airtable.base(__AIRTABLE_BASE__);

/// configuration ///
const practitionerViewName =  'RegistryToolView'  //'RegistryToolView' // 'Grid view'

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
const communityFetchFields = Object.values(communityFieldMap);

/// api ///

export const fetchPractitioner = (practitionerId, setPractitioner) => {
  console.log("Fetching practitioner with ID:", practitionerId);
  base('Organization')
    .select({
      maxRecords: 1,
      view: practitionerViewName,
      filterByFormula: `{org_airtable_record_id} = '${practitionerId}'`,
      fields: practFetchFields,
      maxRecords: 200, // Only fetch up to 200 records
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
      }
      const rec = records.map((rawRec) => rawRec.fields).map((rec) => normalizeRec(rec, practitionerFieldMap))[0];
      setPractitioner(rec);
    });
};

export const fetchFilteredPractitioners = (filters, setPractitioners) => {
    console.log("Fetching practioners with filters:", filters);

  if (!Object.values(filters).some((val) => val && val.length)) {
    setPractitioners([]);
    return;
  }

  let allRecords = [];

  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      maxRecords: 200, // Only fetch up to 200 records
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          .filter((rec) => rec.org_Registry_public === 'Yes' && rec.org_registry_category != 'Specialist' ) 
          .filter((rec) => {
            let matches = true;

            // --- Filtering Logic: "AND" within all multi-select categories ---
            // A practitioner's record MUST contain ALL of the selected values from each active filter category.

            if (filters.state?.length) {
              matches = matches && filters.state.every((s) => rec.state.includes(s));
            }
            if (filters.activities?.length) {
              matches = matches && filters.activities.every((a) => rec.activities.includes(a));
            }
            if (filters.sectors?.length) {
              matches = matches && filters.sectors.every((s) => rec.sectors.includes(s));
            }
            if (filters.hazards?.length) {
              matches = matches && filters.hazards.every(h => rec.hazards.includes(h));
            }
            if (filters.size?.length) {
              matches = matches && filters.size.every((s) => rec.size.includes(s));
            }

            return matches;
          })
          .map((rec) => {
            let matchCount = 0;

            // --- Match Scoring Logic ---
            // Scoring counts individual matches for relevance, even with "AND" filtering.

            if (filters.state?.length) {
              filters.state.forEach((state) => {
                if (rec.state.includes(state)) matchCount++;
              });
            }
            if (filters.activities?.length) {
              filters.activities.forEach((activity) => {
                if (rec.activities.includes(activity)) matchCount++;
              });
            }
            if (filters.sectors?.length) {
              filters.sectors.forEach((sector) => {
                if (rec.sectors.includes(sector)) matchCount++;
              });
            }
            if (filters.hazards?.length) {
              filters.hazards.forEach((hazard) => {
                if (rec.hazards.includes(hazard)) matchCount++;
              });
            }
            if (filters.size?.length) {
              filters.size.forEach((size) => {
                if (rec.size.includes(size)) matchCount++;
              });
            }

            rec.matchScore = matchCount;
            return rec;
          });

        // Collect filtered records into allRecords
        allRecords = [...allRecords, ...recs];
        fetchNextPage(); // Fetch next page if available
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }

        // Sort once all records are fetched
        allRecords.sort((a, b) => b.matchScore - a.matchScore);

        // Set state after all pages are fetched
        setPractitioners(allRecords);
      }
    );
};

export const fetchAllPractitioners = (setAllPractitioners) => {
  console.log("Fetching all practitioners ");
  const practitioners = [];
  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      // Sort by organization name
      sort: [{ field: 'org_name', direction: 'asc' }],
      maxRecords: 200, // Only fetch up to 200 records
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          // Only include Accepted practitioners
          .filter((rec) => rec.org_Registry_public === 'Yes' && rec.org_registry_category != 'Specialist') 
        practitioners.push(...recs);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setAllPractitioners(practitioners);
      }
    );
};

export const fetchOptionsFromAirtable = (setOptions) => {
  console.log("Fetching all options for filters");
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

export const fetchAllPractitionerSpecialist = (setPractitionerSpecialist) => {
      console.log("Fetching all specialist ");
  const practitioners = [];
  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      // Sort by organization name
      sort: [{ field: 'org_name', direction: 'asc' }],
      maxRecords: 200, // Only fetch up to 200 records
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          // Only include Accepted practitioners
          .filter((rec) => rec.org_Registry_public === 'Yes' && rec.org_registry_category === 'Specialist') 
        practitioners.push(...recs);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setPractitionerSpecialist(practitioners);
      }
    );
};


export const fetchFilteredSpecialist = (filters, setPractitionerSpecialist) => {
    console.log("Fetching filtered specialist with filters:", filters);
  if (!Object.values(filters).some((val) => val && val.length)) {
    setPractitionerSpecialist([]);
    return;
  }

  let allRecords = [];

  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      sort: [{ field: 'org_name', direction: 'asc' }],
      maxRecords: 200, // Only fetch up to 200 records
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          .filter((rec) => rec.org_Registry_public === 'Yes' && rec.org_registry_category === 'Specialist' ) 
          .filter((rec) => {
            let matches = false;

            if (filters.state?.length) {
              matches = matches || filters.state?.some((s) => rec.state.includes(s));
            }
            if (filters.activities?.length) {
              matches = matches || filters.activities?.some((s) => rec.activities.includes(s))
            }
            if (filters.sectors?.length) {
              matches = matches || filters.sectors?.some((s) => rec.sectors.includes(s));
            }
            if (filters.hazards?.length) {
              matches = matches || filters.hazards?.some((s) => rec.hazards.includes(s));
            }
            if (filters.size?.length) {
              matches = matches || filters.size?.some((s) => rec.size.includes(s));
            }

            return matches;
          })
          .map((rec) => {
            let matchCount = 0;

            // --- Match Scoring Logic ---
            // Scoring counts individual matches for relevance, even with "AND" filtering.

            if (filters.state?.length) {
              filters.state.forEach((state) => {
                if (rec.state.includes(state)) matchCount++;
              });
            }
            if (filters.activities?.length) {
              filters.activities.forEach((activity) => {
                if (rec.activities.includes(activity)) matchCount++;
              });
            }
            if (filters.sectors?.length) {
              filters.sectors.forEach((sector) => {
                if (rec.sectors.includes(sector)) matchCount++;
              });
            }
            if (filters.hazards?.length) {
              filters.hazards.forEach((hazard) => {
                if (rec.hazards.includes(hazard)) matchCount++;
              });
            }
            if (filters.size?.length) {
              filters.size.forEach((size) => {
                if (rec.size.includes(size)) matchCount++;
              });
            }

            rec.matchScore = matchCount;
            return rec;
          });

        // Collect filtered records into allRecords
        allRecords = [...allRecords, ...recs];
        fetchNextPage(); // Fetch next page if available
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }

        // Sort once all records are fetched
        allRecords.sort((a, b) => b.matchScore - a.matchScore);

        // Set state after all pages are fetched
        setPractitionerSpecialist(allRecords);
      }
    );
};


