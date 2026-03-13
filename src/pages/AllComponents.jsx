import { Container, Box, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import NavBar from '../components/NavBar';
import {
  CallToActionButton,
  AltButton,
  SecondaryButton,
  TertiaryButton,
  AltActionButton,
  BroadServiceProvider,
  SpecialistLabel,
  FilterRemove,
  FilterRemoveTwo,
  HomeDefault,
  FilterCheck,
  PulldownFilter,
  SearchBar,
} from '../components/baseComponents';

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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <CallToActionButton />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <AltButton />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <SecondaryButton />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <TertiaryButton />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <AltActionButton />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <BroadServiceProvider />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <SpecialistLabel />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <FilterRemove />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <FilterRemoveTwo />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <HomeDefault />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
          <FilterCheck />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
          <PulldownFilter />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
          <SearchBar />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
