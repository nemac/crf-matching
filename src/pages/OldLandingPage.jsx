import { Box, Button, Container, ThemeProvider } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../theme';

export default function OldLandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <h1>Welcome to CRF Matching Tool</h1>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            href="/communities"
            startIcon={<GroupIcon />}
            sx={{
              backgroundColor: 'primary.main',
              p: 3,
              minWidth: '200px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Communities
          </Button>

          <Button
            variant="contained"
            href="/selfservice"
            startIcon={<SearchIcon />}
            sx={{
              backgroundColor: 'primary.main',
              p: 3,
              minWidth: '200px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Find a Practitioner for Your Community
          </Button>

          <Button
            variant="contained"
            href="/practitioners"
            startIcon={<BusinessIcon />}
            sx={{
              backgroundColor: 'primary.main',
              p: 3,
              minWidth: '200px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Practitioners
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
