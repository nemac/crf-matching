import { Typography, Container, Box } from '@mui/material';
import PractitionerCard from './PractitionerCard';

export default function RegistryComponent(props) {
  const {
    practitioners = [],
    totalPractitioners = 0,
    selectedForComparison,
    onComparisonSelect,
  } = props;

  return (
    <>
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
              Showing <strong>{practitioners.length}</strong> of{' '}
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
            {practitioners.map((practitioner, index) => (
              <PractitionerCard
                key={index}
                filters=""
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
        </Box>
      </Container>
    </>
  );
}
