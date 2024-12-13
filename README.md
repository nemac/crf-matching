## CRF Matching Application

### Local Setup

- Create an [Airtable Personal Access Token](https://support.airtable.com/docs/creating-personal-access-tokens)
- Create an [ArcGIS Online API Key](https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/create-an-api-key/)
- Create a `.env.` file in base folder that looks like this:

```
AIRTABLE_TOKEN=YOUR_TOKEN
AIRTABLE_BASE=app54Ce7cZjqk6dLw
AGOL_API_KEY=YOUR_API_KEY
```

Run `npm run dev` for local server

### Vite setup

- set base tag for GitHub Pages
- env var injection

### Airtable

- See util/api.js for API to Airtable
- Use community "NEMAC TEST" and practitioners "NEMAC", "NEMAC 2", and "NEMAC 3" for testing
- Only practitioners with Airtable field "Curated" checked will show on a community

### GitHub Pages

- Action sets up Pages for `master` branch

### TODOS

- Revamp Practitioner page - remove unused stakeholder sections
- Replace custom SVG with MUI icons
- Note: CSS is not prepared for >3 practitioners on a community page