import { Container, Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import RequestMagicLink from '../components/updateData/RequestMagicLink';

export default function RequestUpdatePage() {
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
          Update Your Information
        </Typography>

        {/* RequestMagicLink Component */}
        <Box sx={{ mb: 4 }}>
          <RequestMagicLink />
        </Box>
      </Container>
    </ThemeProvider>
  );
}