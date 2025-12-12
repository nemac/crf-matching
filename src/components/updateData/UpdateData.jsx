import { Box, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import FormTextField from '../baseComponents/FormTextField.jsx';
import FormSelect from '../baseComponents/FormSelect.jsx';
import WorkExampleCard from './WorkExampleCard';
import PropTypes from 'prop-types';
import MultiLineFormTextField from '../baseComponents/MultiLineFormTextField.jsx';

const validSectors = [
  'Agriculture and food',
  'Biodiversity and ecosystems',
  'Buildings and infrastructure',
  'Business and economy',
  'Emergency preparedness',
  'Energy',
  'Equity',
  'Fisheries and aquaculture',
  'Forestry',
  'Land use planning',
  'Policy',
  'Public health',
  'Tourism and recreation',
  'Transportation',
  'Water',
];

const validSize = ['Under 10k', '10k-50k', '50k-100k', '100k-200k', '200k-300k', '300k-400k', '400k-500k', 'Over 500k'];

const validHazards = [
  'Extreme heat',
  'Changes in seasons',
  'Drought',
  'Extreme precipitation',
  'Sea level rise and coastal erosion',
  'Flooding',
  'Hurricanes and other storms',
  'Severe winter weather',
  'Shifting species/habitats/ecosystems',
  'Vector-borne disease',
  'Water quality',
  'Air quality',
  'Wildfire',
];

const validActivities = [
  'Vulnerability assessment',
  'Adaptation planning',
  'Project implementation',
  'Communicating and engaging',
  'Changing policy and law',
  'Integrating equity',
  'Financing resilience projects and programs',
];

const validStates = [
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
  'U.S. Virgin Islands',
  'Outside the U.S.',
];

const validLanguages = [
  'English',
  'Spanish',
  'Mandarin Chinese',
  'Hindi',
  'Arabic',
  'Bengali',
  'Portuguese',
  'Russian',
  'Japanese',
  'Punjabi',
  'German',
  'Javanese',
  'Korean',
  'French',
  'Telugu',
  'Marathi',
  'Turkish',
  'Tamil',
  'Vietnamese',
  'Urdu',
  'Italian',
  'Cantonese',
  'Thai',
  'Gujarati',
  'Polish',
  'Ukrainian',
  'Malayalam',
  'Kannada',
  'Oriya',
  'Burmese',
  'Hakka',
  'Pashto',
  'Sundanese',
  'Hausa',
  'Persian',
  'Swahili',
  'Romanian',
  'Dutch',
  'Greek',
  'Czech',
  'Swedish',
  'Hungarian',
  'Tagalog',
  'Amharic',
  'Yoruba',
  'Other',
];

function SectionHeader({ children, sx = {} }) {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 'bold',
        mb: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function UpdateData({ formData, handleChange, handleSubmit, submitting, error, success, isDevMode }) {
  return (
    <Box sx={{ maxWidth: '1200px' }}>
      {/* Dev Mode Message */}
      {isDevMode && (
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
        >
          Save is disabled on dev
        </Alert>
      )}

      {/* Success Message */}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          <strong>Success!</strong> Your information has been updated.
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <SectionHeader>Organization Contact</SectionHeader>

      <Box sx={{ ml: 2, mb: 8 }}>
        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box>
              <FormTextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box>
              <FormTextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2, maxWidth: '583px' }}>
          <FormTextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            fullWidth
          />
        </Box>

        <Box sx={{ mb: 2, maxWidth: '583px' }}>
          <FormTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
          />
        </Box>

        <Box sx={{ mb: 2, maxWidth: '583px' }}>
          <FormTextField
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            type="website"
            fullWidth
          />
        </Box>
      </Box>

      <SectionHeader>Organization Name</SectionHeader>
      <Box sx={{ ml: 2, mb: 8 }}>
        <Box sx={{ mb: 4, maxWidth: '350px' }}>
          <FormTextField
            label="Organization Name"
            name="org"
            value={formData.org}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>

      <SectionHeader>Organization Location</SectionHeader>

      <Box sx={{ ml: 2, mb: 8 }}>
        <Grid
          container
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <Box mr={2}>
              <FormTextField
                label="City"
                name="org_city"
                value={formData.org_city}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Box mr={2}>
              <FormTextField
                label="State"
                name="org_state"
                value={formData.org_state}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Box mr={2}>
              <FormTextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <SectionHeader>LinkedIN</SectionHeader>

      <Box sx={{ ml: 2, mb: 8 }}>
        <Box sx={{ mb: 4, maxWidth: '350px' }}>
          <FormTextField
            label="LinkedIN"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>

      <SectionHeader>Organization Description</SectionHeader>
      <Box sx={{ ml: 2, mb: 8 }}>
        <Box sx={{ mb: 4, maxWidth: '100%' }}>
          <MultiLineFormTextField
            label="Organization Description"
            name="info"
            value={formData.info}
            onChange={handleChange}
            placeholder="Showcase your skills and experience to a targeted audience of communities and organizations actively seeking adaptation support. Joining the registry enhances your visibility and connects you with meaningful projects that make a real-world impact."
          />
        </Box>
      </Box>

      <SectionHeader>Community Specializations</SectionHeader>
      <SectionHeader>Organization Type</SectionHeader>

      <SectionHeader>Organization Size</SectionHeader>
      <Box sx={{ ml: 2, mb: 8 }}>
        <Box sx={{ mb: 4, maxWidth: '350px' }}>
          <FormSelect
            label="Organization Size"
            name="organizationSize"
            value={formData.organizationSize}
            onChange={handleChange}
            options={validSize}
            fullWidth
          />
        </Box>
      </Box>

      <SectionHeader>SBA Category</SectionHeader>
      <SectionHeader>Trainings</SectionHeader>
      <SectionHeader>Years doing adaptation</SectionHeader>
      <SectionHeader>Languages</SectionHeader>
      <Box sx={{ mb: 4, maxWidth: '350px' }}>
        <FormSelect
          label="Change Languages"
          name="languages"
          value={formData.languageFluencies}
          onChange={handleChange}
          options={validLanguages}
          fullWidth
        />
      </Box>
      <SectionHeader>Include on registry</SectionHeader>
      <SectionHeader>Terms and conditions</SectionHeader>
      <SectionHeader>Top Services</SectionHeader>
      <SectionHeader>Services Provided</SectionHeader>
      <SectionHeader>Hazard Expertise</SectionHeader>
      <SectionHeader>Sector Expertise</SectionHeader>
      <SectionHeader>Size of Communities Your Organization Works With</SectionHeader>
      <SectionHeader>Where Your Organization Works</SectionHeader>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitting || success || isDevMode}
        sx={{
          bgcolor: '#003366',
          color: 'white',
          textTransform: 'none',
          px: 6,
          py: 0.5,
          borderRadius: '4px',
          minWidth: '135px',
          height: '29px',
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            bgcolor: '#002244',
          },
          '&:disabled': {
            bgcolor: '#cccccc',
            color: '#666666',
          },
        }}
      >
        {submitting ? (
          <>
            <CircularProgress
              size={16}
              sx={{ mr: 1, color: 'white' }}
            />
            Saving...
          </>
        ) : success ? (
          '✓ Saved'
        ) : (
          'Save'
        )}
      </Button>

      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          backgroundColor: '#F9F3FF',
          py: 6,
          mt: 8,
        }}
      >
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: { xs: 4, md: 8 } }}>
          <SectionHeader sx={{ mb: 4 }}>Examples of Our Work</SectionHeader>
        </Box>

        <Box
          sx={{
            overflowX: 'auto',
            px: { xs: 4, md: 8 },
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#D1D5DB',
              borderRadius: '4px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              maxWidth: '1200px',
              margin: '0 auto',
              width: 'fit-content',
            }}
          >
            <WorkExampleCard
              title={formData.example1_title}
              description={formData.example1_description}
              links={formData.example1_links}
              location={formData.example1_location}
              engagement={formData.example1_engagement}
              equity={formData.example1_equity}
              lead={formData.example1_lead}
              exampleNumber={1}
              handleChange={handleChange}
            />
            <WorkExampleCard
              title={formData.example2_title}
              description={formData.example2_description}
              links={formData.example2_links}
              location={formData.example2_location}
              engagement={formData.example2_engagement}
              equity={formData.example2_equity}
              lead={formData.example2_lead}
              exampleNumber={2}
              handleChange={handleChange}
            />
            <WorkExampleCard
              title={formData.example3_title}
              description={formData.example3_description}
              links={formData.example3_links}
              location={formData.example3_location}
              engagement={formData.example3_engagement}
              equity={formData.example3_equity}
              lead={formData.example3_lead}
              exampleNumber={3}
              handleChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

UpdateData.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  isDevMode: PropTypes.bool,
};
