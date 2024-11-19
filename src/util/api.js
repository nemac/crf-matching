// Airtable
import Airtable from 'airtable';

// set up airtable
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: __AIRTABLE_TOKEN__,
});
const base = Airtable.base(__AIRTABLE_BASE__);

/// configuration ///

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
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
  name: 'Name',
  org: 'Organization Name',
  website: 'Organization Website',
  // TODO setup
  linkedIn: 'LinkedIn URL',
  email: 'Email',
  phone: 'Phone Number',
  strTrained:
    'Are There Members From Your Organization (Or Team) Who Have Completed The N O A A Steps To Resilience Training?',
  id: 'Id',
  info: "Please provide any additional information you want us to know about your organization's (or team's) background and qualifications to provide adaptation services",
  //exampleStakeholders: 'Provide An Example Of Your Experience Working Directly With Stakeholders',
  //exampleMultipleBenefits: 'Provide An Example Of A Project That Provided Multiple Benefits Across Sectors And Scales, And How It Did That',
};

const communityFieldMap = {
  airtableRecId: 'Airtable Record ID',
  name: 'Name',
  state: 'State',
  size: 'Size',
  activities: 'Activities',
  sectors: 'Sectors',
  hazards: 'Hazards',
  id: 'Id',
};

const practFetchFields = Object.values(practitionerFieldMap);
const communityFetchFields = Object.values(communityFieldMap);

/// api ///

export const fetchPractitioner = (practitionerId, setPractitioner) => {
  base('Practitioner')
    .select({
      maxRecords: 1,
      view: 'Grid view',
      filterByFormula: `{Id} = '${practitionerId}'`,
      fields: practFetchFields,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
      }
      console.log('Setting practitioner to');
      const rec = records.map((rawRec) => rawRec.fields).map((rec) => normalizeRec(rec, practitionerFieldMap))[0];
      console.log(rec);
      setPractitioner(rec);
    });
};

export const fetchCommunity = (communityId, setCommunity) => {
  base('Community')
    .select({
      maxRecords: 1,
      view: 'Grid view',
      filterByFormula: `{Id} = '${communityId}'`,
      fields: communityFetchFields,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
      }
      console.log('Setting community to');
      const rec = records
        .map((rawRec) => rawRec.fields)
        .map((rec) => normalizeRec(rec, communityFieldMap))
        // add total of categories
        .map((rec) => {
          rec.totalCategories = rec.activities.length + rec.sectors.length + rec.hazards.length + 2; // size + state
          return rec;
        })[0];
      console.log(rec);
      setCommunity(rec);
    });
};

export const fetchAllCommunities = (setAllCommunities) => {
  const communities = [];
  base('Community')
    .select({
      view: 'Grid view',
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
  base('Practitioner')
    .select({
      view: 'Grid view',
      fields: practFetchFields,
      // Sort by organization name
      sort: [{ field: 'Organization Name', direction: 'asc' }],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        const recs = records.map((rawRec) => rawRec.fields).map((rec) => normalizeRec(rec, practitionerFieldMap));
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
  base('Matches')
    .select({
      maxRecords: 5,
      view: 'Grid view',

      // Curated only
      filterByFormula: `AND({Community: Id} = '${communityId}', {Curated})`,

      // For testing - get all even if not curated
      //  filterByFormula: `{Community: Id} = '${communityId}'`,
      fields: ['Practitioner: Airtable Record ID', 'Practitioner: Id', 'Match Score'],
    })
    .firstPage(function (err, matchRecs) {
      matchRecs = matchRecs.map((rec) => rec.fields);
      if (err) {
        console.error(err);
      }
      const practIdFormulaSegments = matchRecs
        .map((rec) => rec['Practitioner: Airtable Record ID'])
        .map((recId) => `{Airtable Record ID} = '${recId}'`)
        .join(',');
      const formula = `OR(${practIdFormulaSegments})`;

      base('Practitioner')
        .select({
          // maxRecords: 5,
          view: 'Grid view',
          filterByFormula: formula,
          fields: practFetchFields,
        })
        .firstPage(function (err, pracRecs) {
          if (err) {
            console.error(err);
          }

          console.log('Setting practitioners to');
          const recs = pracRecs
            .map((rawRec) => rawRec.fields)
            .map((rec) => normalizeRec(rec, practitionerFieldMap))
            // insert match score manually
            .map((rec) => {
              const filterById = (rec.matchScore = matchRecs.filter((mRec) => {
                const result = mRec['Practitioner: Id'][0] === rec.id;
                return result;
              }));
              rec.matchScore = filterById[0]['Match Score'];
              return rec;
            })
            // sort by match score (descending)
            .sort((r1, r2) => r2.matchScore - r1.matchScore);

          console.log(recs);

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

      // Convert Sets to sorted arrays
      const options = {
        state: [...availableOptions.state].sort(),
        activities: [...availableOptions.activities].sort(),
        hazards: [...availableOptions.hazards].sort(),
        size: [...availableOptions.size].sort(),
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

  // List of practitioners to exclude
  const excludedPractitioners = ['NEMAC', 'NEMAC 2', 'NEMAC 3'];

  base('Practitioner')
    .select({
      view: 'Grid view',
      fields: practFetchFields,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Setting practitioners to');
      const recs = records
        .map((rawRec) => rawRec.fields)
        .map((rec) => normalizeRec(rec, practitionerFieldMap))
        // Filter out excluded practitioners
        .filter((rec) => !excludedPractitioners.includes(rec.org))
        // Calculate match score based on count of all matching items
        .map((rec) => {
          let matchCount = 0;

          // Count each individual match for all categories
          selectedOptions.state.forEach((state) => {
            if (rec.state.includes(state)) {
              matchCount++;
            }
          });

          selectedOptions.activities.forEach((activity) => {
            if (rec.activities.includes(activity)) {
              matchCount++;
            }
          });

          selectedOptions.sectors.forEach((sector) => {
            if (rec.sectors.includes(sector)) {
              matchCount++;
            }
          });

          selectedOptions.hazards.forEach((hazard) => {
            if (rec.hazards.includes(hazard)) {
              matchCount++;
            }
          });

          selectedOptions.size.forEach((size) => {
            if (rec.size.includes(size)) {
              matchCount++;
            }
          });

          rec.matchScore = matchCount;
          return rec;
        })
        // Sort by match score (descending)
        .sort((r1, r2) => r2.matchScore - r1.matchScore);

      setPractitioners(recs);
    });
};
