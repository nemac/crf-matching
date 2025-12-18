import { Box, Typography, Chip, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

export default function NewPractitionerLayout({ formData }) {
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
      <Divider sx={{ mb: 4 }} />
      <SectionHeader>Services Provided</SectionHeader>
      <Divider sx={{ mb: 4 }} />
      <SectionHeader>Hazard Expertise</SectionHeader>
      <Divider sx={{ mb: 4 }} />
      <SectionHeader>Sector Expertise</SectionHeader>
      <Divider sx={{ mb: 4 }} />
      <SectionHeader>Size of Communities We Work With</SectionHeader>
      <Divider sx={{ mb: 4 }} />
      <SectionHeader>Where We Work</SectionHeader>
      <Divider sx={{ mb: 4 }} />
    </Box>
  );
}

NewPractitionerLayout.propTypes = {
  formData: PropTypes.object.isRequired,
};
