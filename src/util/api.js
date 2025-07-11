// Airtable
import Airtable from 'airtable';

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__,
});
const base = Airtable.base(__AIRTABLE_BASE__);

/// configuration ///
const practitionerViewName =  'Grid view'  //'Accepted Practitioners' // 'Grid view'

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
  base('Organization')
    .select({
      maxRecords: 1,
      view: practitionerViewName,
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

export const fetchFilteredPractitioners = (filters, setPractitioners) => {
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
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          .filter((rec) => rec.status === 'Accepted' ) // && rec.org_registry_category != 'Specialist'
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

export const fetchCommunity = (communityId, setCommunity) => {
  base('Community')
    .select({
      maxRecords: 1,
      view: 'Grid view',
      filterByFormula: `{Airtable Record ID} = '${communityId}'`,
      fields: communityFetchFields,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
      }
      const rec = records
        .map((rawRec) => rawRec.fields)
        .map((rec) => normalizeRec(rec, communityFieldMap))
        // add total of categories
        .map((rec) => {
          rec.totalCategories = rec.activities.length + rec.sectors.length + rec.hazards.length + 2; // size + state
          return rec;
        })[0];
      setCommunity(rec);
    });
};

export const fetchAllCommunities = (setAllCommunities) => {
  const communities = [];
  base('Community')
    .select({
      view: 'Grid View',
      fields: communityFetchFields,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records.map((rawRec) => rawRec.fields).map((rec) => normalizeRec(rec, communityFieldMap));
        communities.push(...recs);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setAllCommunities(communities);
      }
    );
};

export const fetchAllPractitioners = (setAllPractitioners) => {
  const practitioners = [];
  base('Organization')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
      // Sort by organization name
      sort: [{ field: 'org_name', direction: 'asc' }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          // Only include Accepted practitioners
          .filter((rec) => rec.status === 'Accepted') // && rec.org_registry_category != 'Specialist'
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

export const fetchPractitionersForCommunity = (communityId, setPractitioners) => {
  base('Curate Community Matches')
    .select({
      maxRecords: 5,
      view: 'Grid view',

      // Curated only
      filterByFormula: `AND({Community-airtable-id} = '${communityId}', {curated status} = 'Curated')`,
      // For testing - get all even if not curated
      //  filterByFormula: `{Community: Id} = '${communityId}'`,
      fields: ['practitioner-airtable-id', 'match score'],
    })
    .firstPage(function (err, matchRecs) {
      matchRecs = matchRecs.map((rec) => rec.fields);
      if (err) {
        console.error(err);
      }
      const practIdFormulaSegments = matchRecs
        .map((rec) => rec['practitioner-airtable-id'])
        .map((recId) => `{Airtable Record ID} = '${recId}'`)
        .join(',');
      const formula = `OR(${practIdFormulaSegments})`;

      base('Practitioner')
        .select({
          // maxRecords: 5,
          view: practitionerViewName,
          filterByFormula: formula,
          fields: practFetchFields,
        })
        .firstPage(function (err, pracRecs) {
          if (err) {
            console.error(err);
          }

          const recs = pracRecs
            .map((rawRec) => rawRec.fields)
            .map((rec) => normalizeRec(rec, practitionerFieldMap))
            // insert match score manually
            .map((rec) => {
              const filterById = (rec.matchScore = matchRecs.filter((mRec) => {
                const result = mRec['practitioner-airtable-id'] === rec.airtableRecId;
                return result;
              }));
              rec.matchScore = filterById[0]['match score'];
              return rec;
            })
            // sort by match score (descending)
            .sort((r1, r2) => r2.matchScore - r1.matchScore);

          // for testing - shuffle result
          // shuffle(recs)
          // for testing - limit to three when testing with non-curated
          // const result = recs.slice(0, 3)
          const result = recs;

          setPractitioners(result);
        });
    });
};

export const fetchOptionsFromAirtable = (setOptions) => {
  base('Options')
    .select({
      view: 'Grid view',
      fields: ['State', 'Activities', 'Hazards', 'Size', 'Sectors'],
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

export const fetchPractitionersByFilters = (selectedOptions, setPractitioners) => {
  // If no selections, clear practitioners
  if (Object.values(selectedOptions).every((arr) => arr.length === 0)) {
    setPractitioners([]);
    return;
  }

  let allRecords = [];

  base('Practitioner')
    .select({
      view: practitionerViewName,
      fields: practFetchFields,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records
          .map((rawRec) => rawRec.fields)
          .map((rec) => normalizeRec(rec, practitionerFieldMap))
          .filter((rec) => rec.status === 'Accepted') // && rec.org_registry_category != 'Specialist'
        allRecords = [...allRecords, ...recs];

        fetchNextPage(); // Fetch next page if available
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }

        // After all pages are fetched, calculate match scores
        const filteredRecords = allRecords
          .map((rec) => {
            let matchCount = 0;

            // Count each individual match for all categories
            selectedOptions.state.forEach((state) => {
              if (rec.state.includes(state)) matchCount++;
            });

            selectedOptions.activities.forEach((activity) => {
              if (rec.activities.includes(activity)) matchCount++;
            });

            selectedOptions.sectors.forEach((sector) => {
              if (rec.sectors.includes(sector)) matchCount++;
            });

            selectedOptions.hazards.forEach((hazard) => {
              if (rec.hazards.includes(hazard)) matchCount++;
            });

            selectedOptions.size.forEach((size) => {
              if (rec.size.includes(size)) matchCount++;
            });

            rec.matchScore = matchCount;
            return rec;
          })
          // Sort by match score (descending)
          .sort((a, b) => b.matchScore - a.matchScore);

        setPractitioners(filteredRecords);
      }
    );
};
