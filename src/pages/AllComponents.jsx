import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import CallToActionButton from '../components/baseComponents/CallToActionButton';

const ComponentDisplay = ({ name, children }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      {children}
    </Box>
  </Box>
);

export default function AllComponents() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          pt: 4,
          pb: 8,
          px: { xs: 4, sm: 4, md: 4, lg: 3 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 4,
            mt: 4,
          }}
        >
          Base Components
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <ComponentDisplay name="CallToActionButton">
              <CallToActionButton />
            </ComponentDisplay>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
