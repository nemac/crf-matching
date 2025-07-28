import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';

export default function PractitionerWorkExamplePage() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />    
      <Container
        maxWidth="xl"
        sx={{ pt: 4, pb: 8, cursor: 'default' }}
      >
        {/* Main Title Section */}
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
          Work Example
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
