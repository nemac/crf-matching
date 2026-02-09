import { Box, Container, Stack } from '@mui/material';
import NavBar from '../components/NavBar.jsx';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Stack direction="column" spacing={8} sx={{ mt: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            Browse all x practitioners section
          </Box>
          <Box sx={{ textAlign: 'center' }}>How the Registry Works</Box>
          <Box sx={{ textAlign: 'center' }}>
            The Registry includes two categories of practitioners
          </Box>
          <Box sx={{ textAlign: 'center' }}>How to apply</Box>
        </Stack>
      </Container>
    </>
  );
}
