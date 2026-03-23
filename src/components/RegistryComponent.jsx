import { useState, useEffect } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import PractitionerCard from './PractitionerCard';

export default function RegistryComponent(props) {
  const { practitioners = [], totalPractitioners = 0 } = props;

  const [isAscending, setIsAscending] = useState(true);

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
            <Button
              startIcon={<SortByAlphaIcon />}
              sx={{
                bgcolor: 'primary.white',
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.borderGray',
                borderRadius: '20px',
                boxShadow: 1,
                px: 2,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              onClick={() => {
                const sorted = [...practitioners].sort((a, b) =>
                  a.org.localeCompare(b.org)
                );
                if (!isAscending) {
                  sorted.reverse();
                }
                setPractitioners(sorted);
                setIsAscending(!isAscending);
              }}
            >
              Sort
            </Button>
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
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}
