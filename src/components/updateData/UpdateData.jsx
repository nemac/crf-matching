import { Box, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import FormTextField from './FormTextField';
import PropTypes from 'prop-types';

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

      {/* Organization Contact Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Organization Contact
      </Typography>

      {/* First Name and Last Name Row */}
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
          <FormTextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <FormTextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Phone Number Row */}
      <Box sx={{ mb: 2, maxWidth: '578px' }}>
        <FormTextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          fullWidth
        />
      </Box>

      {/* Email Row */}
      <Box sx={{ mb: 2, maxWidth: '578px' }}>
        <FormTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
        />
      </Box>

      {/* Website Row */}
      <Box sx={{ mb: 2, maxWidth: '578px' }}>
        <FormTextField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          type="website"
          fullWidth
        />
      </Box>

      {/* Organization Name Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          mt: 4,
        }}
      >
        Organization Name
      </Typography>

      <Box sx={{ mb: 4, maxWidth: '350px' }}>
        <FormTextField
          label="Organization Name"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          fullWidth
        />
      </Box>

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
