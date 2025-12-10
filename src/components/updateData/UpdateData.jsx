import { Box, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import FormTextField from './FormTextField';
import PropTypes from 'prop-types';

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
            name="organizationName"
            value={formData.organizationName}
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
                name="city"
                value={formData.city}
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
                name="state"
                value={formData.state}
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
            name="linkedIN"
            value={formData.linkedIN}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>

      <SectionHeader>Organization Description</SectionHeader>
      <SectionHeader>Community Specializations</SectionHeader>
      <SectionHeader>Organization Type</SectionHeader>
      <SectionHeader>Organization Size</SectionHeader>
      <SectionHeader>SBA Category</SectionHeader>
      <SectionHeader>Trainings</SectionHeader>
      <SectionHeader>Years doing adaptation</SectionHeader>
      <SectionHeader>Languages</SectionHeader>
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
