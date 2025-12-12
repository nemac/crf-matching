import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import WorkExampleForm from '../components/updateData/WorkExampleForm';

export default function WorkExamplePage() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('workExampleData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
      sessionStorage.removeItem('workExampleData');
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
      </Container>
    </ThemeProvider>
  );
}