import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../theme';
import NavBar from '../components/NavBar';
import UpdateData from '../components/updateData/UpdateData.jsx';
import NewPractitionerLayout from '../components/updateData/NewPractitionerLayout.jsx';
import { validateToken, updateOrganization } from '../config/api';

export default function UpdateDataPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    firstName: 'Jeff Jeff Jeff',
    lastName: 'Bliss Bliss Bliss',
    phone: 'xxx-xxx-xxxx',
    email: 'jeff@jeff.jeff',
    website: 'https://jeff.jeff.jeff',
    organizationName: 'Jeff Corp',
    city: 'JeffTown',
    state: 'Jeff Carolina',
    linkedIN: '',
    organizationDescription: '',
  });

  const [isPreview, setIsPreview] = useState(false);
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

      // Skip validation for dev token
      if (token === 'dev') {
        setTokenValid(true);
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

  const handleToggle = () => {
    setIsPreview(!isPreview);
  };

  // Show loading state while validating token
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <Container
          maxWidth="xl"
          sx={{
            pt: 4,
            pb: 8,
            cursor: 'default',
            px: { xs: 4, sm: 4, md: 4, lg: 3 },
          }}
        >
          <Box sx={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={50} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>Validating your link...</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  // Show error if token is invalid
  if (!tokenValid) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <Container
          maxWidth="xl"
          sx={{
            pt: 4,
            pb: 8,
            cursor: 'default',
            px: { xs: 4, sm: 4, md: 4, lg: 3 },
          }}
        >
          <Box sx={{ maxWidth: '600px' }}>
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
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
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          pt: 4,
          pb: 8,
          cursor: 'default',
          px: { xs: 4, sm: 4, md: 4, lg: 3 },
        }}
      >
        {/* Title Section */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mt: 4,
            mb: 2,
          }}
        >
          {formData.organizationName}
        </Typography>

        {/* Preview/Edit Button */}
        <Button
          variant="contained"
          startIcon={isPreview ? <ArrowBackIcon /> : <VisibilityIcon />}
          onClick={handleToggle}
          sx={{
            bgcolor: '#F5E6D3',
            color: '#3D3D3D',
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1,
            mb: 4,
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#E8D5BD',
              boxShadow: 'none',
            },
          }}
        >
          {isPreview ? 'Back to Edit' : 'Preview Profile Page'}
        </Button>

        {/* Render based on mode */}
        <Box sx={{ mb: 4 }}>
          {isPreview ? (
            <NewPractitionerLayout formData={formData} />
          ) : (
            <UpdateData
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              submitting={submitting}
              error={error}
              success={success}
              isDevMode={token === 'dev'}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
