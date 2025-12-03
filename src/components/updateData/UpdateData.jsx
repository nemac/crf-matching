import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FormTextField from './FormTextField';
import { validateToken, updateOrganization } from '../../config/api';

export default function UpdateData() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organizationName: '',
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  // Validate token and fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setError('No token provided. Please request a new magic link.');
        setLoading(false);
        return;
      }

      try {
        const result = await validateToken(token);

        if (result.success && result.data) {
          // Prefill form with data from Airtable
          setFormData({
            firstName: result.data.firstName || '',
            lastName: result.data.lastName || '',
            phone: result.data.phone || '',
            email: result.data.email || '',
            organizationName: result.data.organizationName || '',
          });
          setTokenValid(true);
        } else {
          setError('Invalid token. Please request a new magic link.');
        }
      } catch (err) {
        if (err.message.includes('expired')) {
          setError('This link has expired. Please request a new magic link.');
        } else {
          setError('Invalid or expired link. Please request a new magic link.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);

    try {
      const result = await updateOrganization(token, formData);

      if (result.success) {
        setSuccess(true);
        // Optionally redirect after a delay
        setTimeout(() => {
          // You can redirect to a success page or home page
          // navigate('/');
        }, 3000);
      } else {
        setError(result.error || 'Failed to update organization');
      }
    } catch (err) {
      if (err.message.includes('expired')) {
        setError('This link has expired. Please request a new magic link.');
      } else {
        setError('An error occurred while updating. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state while validating token
  if (loading) {
    return (
      <Box sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
        <CircularProgress size={50} />
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Validating your link...
        </Typography>
      </Box>
    );
  }

  // Show error if token is invalid
  if (!tokenValid) {
    return (
      <Box sx={{ maxWidth: '600px' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>Invalid or Expired Link</strong>
          <br />
          {error || 'This link is no longer valid. Please request a new magic link.'}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/request-update')}
          sx={{
            bgcolor: '#003366',
            color: 'white',
            textTransform: 'none',
            px: 4,
            py: 1,
            '&:hover': {
              bgcolor: '#002244',
            },
          }}
        >
          Request New Link
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      {/* Success Message */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Success!</strong> Your information has been updated.
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
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
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <FormTextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        disabled={submitting || success}
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
            <CircularProgress size={16} sx={{ mr: 1, color: 'white' }} />
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