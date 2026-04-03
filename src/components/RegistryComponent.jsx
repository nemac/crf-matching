import { Typography, Container, Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PractitionerCard from './PractitionerCard';
import TertiaryButton from './baseComponents/TertiaryButton';

export default function RegistryComponent(props) {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const columns = isXl ? 4 : isLg ? 3 : isMd ? 2 : 1;
  const pageSize = columns * 3;
  const {
    practitioners = [],
    totalPractitioners = 0,
    selectedForComparison,
    onComparisonSelect,
    displayCount,
    onLoadMore,
    loading,
    source = '',
    state = [],
    activities = [],
    hazards = [],
    sectors = [],
  } = props;

  const buildFilters = () => {
    const params = new URLSearchParams();
    if (source) params.set('source', source);
    if (state.length > 0) params.set('state', state.join(','));
    if (activities.length > 0) params.set('activities', activities.join(','));
    if (hazards.length > 0) params.set('hazards', hazards.join(','));
    if (sectors.length > 0) params.set('sectors', sectors.join(','));
    return params.toString();
  };

  const visiblePractitioners = displayCount
    ? practitioners.slice(0, displayCount)
    : practitioners;
  const hasMore = displayCount && displayCount < practitioners.length;

  if (loading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'primary.sectionBg', width: '100%', pt: 2, pb: 4 }}>
      <Container
        maxWidth="xl"
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 4, sm: 4, md: 4, lg: 3 },
        }}
      >
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              gap: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Filtered <strong>{practitioners.length}</strong> of{' '}
              {totalPractitioners} Adaptation Practitioners
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 3,
              mb: 4,
              justifyContent: 'center',
            }}
          >
            {visiblePractitioners.map((practitioner, index) => (
              <PractitionerCard
                key={index}
                filters={buildFilters()}
                practitioner={practitioner}
                onComparisonSelect={onComparisonSelect}
                isSelectedForComparison={
                  selectedForComparison
                    ? selectedForComparison.has(practitioner.airtableRecId)
                    : false
                }
              />
            ))}
          </Box>

          {hasMore && onLoadMore && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TertiaryButton
                onClick={() => onLoadMore(pageSize)}
                sx={{
                  width: 233,
                  height: 37,
                  padding: '8px 0px',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
                  borderRadius: '4px',
                  textTransform: 'none',
                  color: 'primary.main',
                  fontWeight: 400,
                  fontSize: '18px',
                }}
              >
                Load More Practitioners
              </TertiaryButton>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
