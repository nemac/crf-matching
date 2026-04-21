import Airtable from 'airtable';
import { readFileSync } from 'fs';

const envText = readFileSync('.env', 'utf8');
const env = Object.fromEntries(
  envText.split('\n').filter(l => l.includes('=')).map(l => {
    const [k, ...rest] = l.split('=');
    return [k.trim(), rest.join('=').trim()];
  })
);

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: env.AIRTABLE_TOKEN,
});
const base = Airtable.base(env.AIRTABLE_BASE);

const practitionerViewName = 'RegistryPractitionerAndSpecialistsToolView';

const practitionerFieldMap = {
  airtableRecId: 'org_airtable_record_id',
  state: 'org_states_territories',
  size: 'org_comm_size',
  activities: 'org_services_provided_other',
  sectors: 'org_sectors',
  hazards: 'org_climate_hazards',
  org: 'org_name',
  org_registry_category: 'org_registry_category',
  topServicesProvided: 'org_services_provided_top',
};

const normalize = (rec) => {
  const out = {};
  for (const [k, airKey] of Object.entries(practitionerFieldMap)) {
    out[k] = rec[airKey];
  }
  return out;
};

const asArray = v => Array.isArray(v) ? v : v ? [v] : [];

const calculateMatchCount = (practitioner, filters) => {
  let count = 0;
  for (const field of ['state', 'activities', 'hazards', 'size', 'sectors']) {
    if (filters[field]?.length > 0) {
      const arr = asArray(practitioner[field]);
      filters[field].forEach(v => { if (arr.includes(v)) count++; });
    }
  }
  return count;
};

const calculateMatchScore = (practitioner, filters) => {
  let earned = 0;
  let max_possible = 0;
  const topServices = asArray(practitioner.topServicesProvided);

  for (const field of ['state', 'activities', 'hazards', 'size', 'sectors']) {
    if (!filters[field]?.length) continue;
    const practArr = asArray(practitioner[field]);
    for (const v of filters[field]) {
      if (field === 'activities') {
        max_possible += 3;
        if (practArr.includes(v)) {
          earned += topServices.includes(v) ? 3 : 1;
        }
      } else {
        max_possible += 1;
        if (practArr.includes(v)) earned += 1;
      }
    }
  }

  if (max_possible === 0) return 0;
  return Math.round((earned / max_possible) * 100);
};

console.log('Fetching all practitioners...');
const records = await base('Organization').select({ view: practitionerViewName }).all();
const practitioners = records.map(r => normalize(r.fields));
console.log(`Fetched ${practitioners.length} practitioners.\n`);

const specialists = practitioners.filter(p => p.org_registry_category === 'Specialist');
const broad = practitioners.filter(p => p.org_registry_category === 'Broad service provider');
console.log(`Specialists: ${specialists.length}, Broad: ${broad.length}\n`);

const scenarios = [
  { name: 'URL scenario (everything)', filters: {
    activities: ['Adaptation planning', 'Changing policy and law', 'Integrating equity', 'Vulnerability assessment', 'Communicating and engaging', 'Financing resilience projects and programs', 'Project implementation'],
    hazards: ['Air quality', 'Changes in seasons', 'Drought', 'Flooding', 'Extreme precipitation', 'Hurricanes and other storms', 'Extreme heat'],
    state: ['North Carolina'],
    sectors: ['Energy', 'Buildings and infrastructure', 'Agriculture and food', 'Biodiversity and ecosystems', 'Business and economy', 'Emergency preparedness', 'Equity', 'Fisheries and aquaculture', 'Forestry', 'Land use planning', 'Policy', 'Public health', 'Tourism and recreation', 'Transportation', 'Water'],
    size: ['Under 10k', '10k-50k', '50k-100k', '100k-200k', '200k-300k', '300k-400k', '400k-500k', 'Over 500k'],
  }},
];

const stats = (arr) => {
  if (arr.length === 0) return { min: 0, max: 0, mean: 0, median: 0 };
  const sorted = [...arr].sort((a, b) => a - b);
  const sum = arr.reduce((a, b) => a + b, 0);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: Math.round(sum / arr.length * 10) / 10,
    median: sorted[Math.floor(sorted.length / 2)],
  };
};

const histogram = (arr) => {
  const buckets = Array(11).fill(0);
  arr.forEach(s => {
    const b = s === 100 ? 10 : Math.floor(s / 10);
    buckets[b]++;
  });
  const labels = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-99', '100'];
  return labels.map((l, i) => `  ${l.padStart(6)}: ${buckets[i]}`).join('\n');
};

const report = (label, group, filters) => {
  const counts = group.map(p => calculateMatchCount(p, filters));
  const scores = group.map(p => calculateMatchScore(p, filters));
  const zeros = scores.filter(s => s === 0).length;
  const hundreds = scores.filter(s => s === 100).length;
  console.log(`\n-- ${label} (n=${group.length}) --`);
  console.log(`Count  — ${JSON.stringify(stats(counts))}`);
  console.log(`Score  — ${JSON.stringify(stats(scores))}`);
  console.log(`Zeros: ${zeros} | 100s: ${hundreds}`);
  console.log(`Histogram:\n${histogram(scores)}`);
};

for (const sc of scenarios) {
  console.log(`\n=== ${sc.name} ===`);
  console.log(`Filters: ${JSON.stringify(sc.filters)}`);
  report('All', practitioners, sc.filters);
  report('Specialists', specialists, sc.filters);
  report('Broad service providers', broad, sc.filters);
}

process.exit(0);
