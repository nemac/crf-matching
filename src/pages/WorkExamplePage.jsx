import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../theme';
import NavBar from '../components/NavBar';
import WorkExampleForm from '../components/updateData/WorkExampleForm';
import NewWorkExampleLayout from '../components/updateData/NewWorkExampleLayout';

export default function WorkExamplePage() {
  const [formData, setFormData] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('workExampleData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    window.opener.postMessage(
      { type: 'updateWorkExample', name, value },
      window.location.origin
    );
  };

  const handleToggle = () => {
    setIsPreview(!isPreview);
  };

  if (!formData) {
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
          <Typography>Loading...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  const workExampleData = {
    title: formData.title,
    description: formData.description,
    location: formData.location,
    engagement: formData.engagement,
    equity: formData.equity,
    lead: formData.lead,
  };

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
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            onClick={handleToggle}
            startIcon={isPreview ? <ArrowBackIcon /> : <VisibilityIcon />}
            sx={{
              bgcolor: '#003366',
              color: 'white',
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: '4px',
              boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
              '&:hover': {
                bgcolor: '#002244',
              },
            }}
          >
            {isPreview ? 'Back to Edit' : 'Preview'}
          </Button>
        </Box>

        {isPreview ? (
          <NewWorkExampleLayout
            workExampleData={workExampleData}
            organizationName={formData.organizationName}
          />
        ) : (
          <WorkExampleForm
            exampleNumber={formData.exampleNumber}
            title={formData.title}
            description={formData.description}
            links={formData.links}
            location={formData.location}
            engagement={formData.engagement}
            equity={formData.equity}
            lead={formData.lead}
            handleChange={handleChange}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}