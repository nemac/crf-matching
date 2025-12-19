import { Box, Typography, Chip, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkExampleCard from './WorkExampleCard';

const SectionHeader = ({ children, sx = {} }) => {
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
};

const MultiSelectionDisplay = ({ selected = [], validOptions }) => {
  const unselectedOptions = validOptions.filter(
    option => !selected.includes(option)
  );

  return (
    <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap', ml: 2, mb: 8 }}>
      {selected.map((item, index) => (
        <Chip
          key={`selected-${index}`}
          label={item}
          icon={<CheckCircleIcon sx={{ color: '#0066CC !important' }} />}
          sx={{
            borderRadius: '9999px',
            border: '1px solid #0066CC',
            padding: '5px 12px',
            color: '#0066CC',
            bgcolor: '#66CCFF',
            '& .MuiChip-icon': {
              marginLeft: '12px',
              marginRight: '-6px',
            },
          }}
        />
      ))}
      {unselectedOptions.map((item, index) => (
        <Chip
          key={`valid-${index}`}
          label={item}
          sx={{
            borderRadius: '9999px',
            border: '1px solid #0066CC',
            padding: '6px 12px',
            bgcolor: '#F9FAFB',
            color: '#000',
          }}
        />
      ))}
    </Box>
  );
};

MultiSelectionDisplay.propTypes = {
  selected: PropTypes.array.isRequired,
  validOptions: PropTypes.array.isRequired,
};

const NewPractitionerLayout = props => {
  const {
    formData,
    validServices,
    validHazards,
    validSectors,
    validCommunitySize,
    validStates,
  } = props;
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          label="Adaptation Practitioner"
          sx={{
            bgcolor: '#B3D9FF',
            color: '#003366',
            fontWeight: 500,
            fontSize: '0.875rem',
            height: '32px',
            borderRadius: '16px',
          }}
        />
        <Chip
          label="Adaptation Specialist"
          sx={{
            bgcolor: '#F5D5A8',
            color: '#805000',
            fontWeight: 500,
            fontSize: '0.875rem',
            height: '32px',
            borderRadius: '16px',
          }}
        />
      </Box>

      <SectionHeader>Organization Contact</SectionHeader>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2, mb: 8 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LanguageIcon sx={{ color: '#666' }} />
          <Typography sx={{ color: '#666' }}>
            {formData.website || ''}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <EmailIcon sx={{ color: '#666' }} />
          <Typography sx={{ color: '#666' }}>{formData.email || ''}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PhoneIcon sx={{ color: '#666' }} />
          <Typography sx={{ color: '#666' }}>{formData.phone || ''}</Typography>
        </Box>
      </Box>

      <SectionHeader>Organization Location</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <LocationOnIcon sx={{ color: '#666' }} />
        <Typography sx={{ color: '#666' }}>
          {formData.city && formData.state
            ? `${formData.city}, ${formData.state}`
            : formData.city || formData.state || ''}
        </Typography>
      </Box>

      <SectionHeader>Organization Description</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography sx={{ color: '#666' }}>{formData.info || ''}</Typography>
      </Box>

      <SectionHeader>Community Specializations</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography sx={{ color: '#666' }}>
          {formData.specificTypesOfCommunities || ''}
        </Typography>
      </Box>

      <SectionHeader>Organization Type</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography sx={{ color: '#666' }}>
          {formData.organizationType || ''}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Top Services</SectionHeader>
      <MultiSelectionDisplay
        selected={formData.topServicesProvided}
        validOptions={validServices}
      />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Services Provided</SectionHeader>
      <MultiSelectionDisplay
        selected={formData.activities}
        validOptions={validServices}
      />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Hazard Expertise</SectionHeader>
      <MultiSelectionDisplay
        selected={formData.hazards}
        validOptions={validHazards}
      />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Sector Expertise</SectionHeader>
      <MultiSelectionDisplay
        selected={formData.sectors}
        validOptions={validSectors}
      />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Size of Communities We Work With</SectionHeader>
      <MultiSelectionDisplay
        selected={formData.communitySize}
        validOptions={validCommunitySize}
      />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Where We Work</SectionHeader>
      <MultiSelectionDisplay
        selected={formData.whereOrganizationWorks}
        validOptions={validStates}
      />
      <Divider sx={{ mb: 4 }} />

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
        <Box
          sx={{ maxWidth: '1200px', margin: '0 auto', px: { xs: 4, md: 8 } }}
        >
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
              organizationName={formData.org}
              buttonText="Full Work Example"
              openInPreview
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
              organizationName={formData.org}
              buttonText="Full Work Example"
              openInPreview
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
              organizationName={formData.org}
              buttonText="Full Work Example"
              openInPreview
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPractitionerLayout;

NewPractitionerLayout.propTypes = {
  formData: PropTypes.object.isRequired,
  validServices: PropTypes.array.isRequired,
  validHazards: PropTypes.array.isRequired,
  validSectors: PropTypes.array.isRequired,
  validCommunitySize: PropTypes.array.isRequired,
  validStates: PropTypes.array.isRequired,
};
