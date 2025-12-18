import { Box, Typography, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function NewPractitionerLayout({ formData }) {
  return (
    <Box sx={{ maxWidth: '1200px' }}>
      {/* Tags/Chips */}
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

      {/* Organization Contact Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Organization Contact
      </Typography>

      {/* Contact Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Website */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LanguageIcon sx={{ color: '#666' }} />
          <Typography sx={{ color: '#666' }}>
            {formData.website || 'Website'}
          </Typography>
        </Box>

        {/* Email */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <EmailIcon sx={{ color: '#666' }} />
          <Typography sx={{ color: '#666' }}>
            {formData.email || 'Email'}
          </Typography>
        </Box>

        {/* Phone Number */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PhoneIcon sx={{ color: '#666' }} />
          <Typography sx={{ color: '#666' }}>
            {formData.phone || 'Phone Number'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

NewPractitionerLayout.propTypes = {
  formData: PropTypes.object.isRequired,
};
