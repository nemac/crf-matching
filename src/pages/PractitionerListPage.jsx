import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { fetchAllPractitioners } from '../util/api';
import FullPageSpinner from '../components/FullPageSpinner';
import { ThemeProvider } from '@mui/material/styles';
import climatePracLogo from '../assets/climate_prac.png';
import theme from '../theme';

function PractitionerCard({ practitioner }) {
  const description = practitioner.info || 'No description available';
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;

  // Only take first 3 activities
  const displayedActivities = practitioner.activities.slice(0, 3);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Logo Container */}
        <Box
          sx={{
            width: '100%',
            height: 140,
            mb: 2,
            backgroundColor: '#F5F5F5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            px: -1,
          }}
        >
          <img
            src={climatePracLogo}
            alt="Company Logo"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          component="div"
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          {practitioner.org}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {truncatedDescription}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 'bold' }}
          >
            Expertise
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            gap={1}
          >
            {displayedActivities.map((activity, index) => (
              <Chip
                key={index}
                label={activity}
                size="small"
                sx={{
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  border: `1px solid ${theme.palette.primary.midBlue}`,
                  color: theme.palette.primary.main,
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Button
            fullWidth
            variant="contained"
            href={`#/practitioner/${practitioner.id}`}
            startIcon={<PersonIcon />}
            sx={{
              backgroundColor: theme.palette.primary.midBlue,
              borderRadius: 8,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            Full Practitioner Org Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function PractitionerListPage() {
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

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
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

export default PractitionerListPage;
