import { Box, Typography, Chip, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
      {validOptions.map((item, index) => (
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
    <Box sx={{ maxWidth: '1200px' }}>
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
    </Box>
  );
};

export default NewPractitionerLayout;

NewPractitionerLayout.propTypes = {
  formData: PropTypes.object.isRequired,
};
