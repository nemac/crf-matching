import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { fetchAllPractitioners } from '../util/api';
import FullPageSpinner from '../components/FullPageSpinner';
import PractitionerCard from '../components/PractitionerCard';
import Logo from '../components/Logo';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

export default function PractitionerListPage() {
  const [allPractitioners, setAllPractitioners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await fetchAllPractitioners(setAllPractitioners);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <FullPageSpinner />;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        <Logo /> {/* CSCI Logo */}
        <Typography
          variant="h4"
          textAlign="center"
          component="h1"
          sx={{ mb: 4 }}
        >
          CRF Practitioner Directory
        </Typography>
        <Grid
          container
          spacing={3}
        >
          {allPractitioners.map((practitioner, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <PractitionerCard practitioner={practitioner} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
