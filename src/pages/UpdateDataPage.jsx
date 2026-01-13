import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../theme';
import NavBar from '../components/NavBar';
import UpdateData from '../components/updateData/UpdateData.jsx';
import NewPractitionerLayout from '../components/updateData/NewPractitionerLayout.jsx';
import { validateToken, updateOrganization } from '../config/api';
import { practitionerFieldMap } from '../config/config';

const validServices = [
  'Adaptation planning',
  'Changing policy and law',
  'Communicating and engaging',
  'Financing resilience projects and programs',
  'Integrating Equity',
  'Project implementation',
  'Vulnerability assessment',
];

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

const validCommunitySize = [
  'Under 10k',
  '10k-50k',
  '50k-100k',
  '100k-200k',
  '200k-300k',
  '300k-400k',
  '400k-500k',
  'Over 500k',
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
  'Virgin Islands',
  // 'Outside the U.S.', TODO: add this as allowable choice
];

export default function UpdateDataPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // const [formData, setFormData] = useState({
  //   firstName: 'Jeff Jeff Jeff',
  //   lastName: 'Bliss Bliss Bliss',
  //   phone: 'xxx-xxx-xxxx',
  //   email: 'jeff@jeff.jeff',
  //   website: 'https://jeff.jeff.jeff',
  //   org: 'Jeff Corp',
  //   city: 'Asheville',
  //   state: 'North Carolina',
  //   linkedIn: 'N/A',
  //   specificTypesOfCommunities: '',
  //   organizationType: 'Consultant agency',
  //   info: 'info about jeff jeff jeff corp. Here is some info you can make about jeff corp. Hello. La di da di da di da. Hi hi hi hi hi',
  //   communitySize: ['Under 10k'],
  //   organizationSize: 'Self-employed',
  //   sbaCategory: 'None of the above',
  //   adaptationYears: 15,
  //   languageFluencies: ['Spanish', 'French'],
  //   includeOnRegistry: 'Yes',
  //   termsAndConditions: 'No',
  //   topServicesProvided: [
  //     'Adaptation planning',
  //     'Changing policy and law',
  //     'Communicating and engaging',
  //   ],
  //   activities: [
  //     'Adaptation planning',
  //     'Changing policy and law',
  //     'Communicating and engaging',
  //     'Financing resilience projects and programs',
  //     'Integrating Equity',
  //     'Project implementation',
  //     'Vulnerability. assessment',
  //   ],
  //   hazards: ['Extreme heat', 'Changes in seasons', 'Drought'],
  //   sectors: [
  //     'Agriculture and food',
  //     'Biodiversity and ecosystems',
  //     'Buildings and infrastructure',
  //     'Business and economy',
  //   ],
  //   whereOrganizationWorks: ['Illinois', 'New York', 'North Carolina'],
  //   example1_title: 'Jeff Work Example 1',
  //   example1_description: 'Jeff Work Example 1 Text.',
  //   example1_links: '',
  //   example1_location: 'City and State Example 1',
  //   example1_engagement:
  //     'This is Jeff Work Example 1 Approach to Stakeholder Engagement',
  //   example1_equity: 'This is Jeff Work Example 1 Approach to Equity',
  //   example1_lead: 'Sir Jeff of Jeffington',
  //   example2_title: 'Jeff Work Example 2',
  //   example2_description: 'Jeff Work Example 2 Text.',
  //   example2_links: '',
  //   example2_location: 'City and State Example 2',
  //   example2_engagement:
  //     'This is Jeff Work Example 2 Approach to Stakeholder Engagement',
  //   example2_equity: 'This is Jeff Work Example 2 Approach to Equity',
  //   example2_lead: 'Sir Jeffrey',
  //   example3_title: 'Dave Work Example',
  //   example3_description: 'Dave Work Example Text.',
  //   example3_links: '',
  //   example3_location: 'City and State Example 3',
  //   example3_engagement:
  //     'This is Dave Work Example Approach to Stakeholder Engagement',
  //   example3_equity: 'This is Dave Work Example Approach to Equity',
  //   example3_lead: 'King David',
  // });
  const [formData, setFormData] = useState({});

  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  console.log('formData in main', formData);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setError('No token provided. Please request a new magic link.');
        setLoading(false);
        return;
      }

      if (token === 'dev') {
        setTokenValid(true);
        setLoading(false);
        return;
      }

      try {
        const result = await validateToken(token);

        if (result.success && result.data) {
          const updatedFormData = {};

          Object.keys(practitionerFieldMap).forEach(frontendField => {
            if (result.data[frontendField] !== undefined) {
              updatedFormData[frontendField] = result.data[frontendField];
            }
          });
          console.log('updated form data', updatedFormData);

          setFormData(prevData => ({
            ...prevData,
            ...updatedFormData,
          }));
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

  useEffect(() => {
    const handleMessage = event => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'updateWorkExample') {
        const { name, value } = event.data;
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
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
          <Box
            sx={{
              maxWidth: '1200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 8,
            }}
          >
            <CircularProgress size={50} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Validating your link...
            </Typography>
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
            <Alert severity="error" sx={{ mb: 3 }}>
              <strong>Invalid or Expired Link</strong>
              <br />
              {error ||
                'This link is no longer valid. Please request a new magic link.'}
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
          {formData.org}
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
            <NewPractitionerLayout
              formData={formData}
              validServices={validServices}
              validHazards={validHazards}
              validSectors={validSectors}
              validCommunitySize={validCommunitySize}
              validStates={validStates}
            />
          ) : (
            <UpdateData
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              submitting={submitting}
              error={error}
              success={success}
              isDevMode={token === 'dev'}
              validServices={validServices}
              validHazards={validHazards}
              validSectors={validSectors}
              validCommunitySize={validCommunitySize}
              validStates={validStates}
              token={token}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
