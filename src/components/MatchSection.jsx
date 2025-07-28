import { Box } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import MatchBadge from '../components/MatchBadge';

export default function MatchSection({ filters, practitioner, title, objKey }) {  
  // fixes for blank top 3
  const items = Array.isArray(practitioner[objKey]) ? practitioner[objKey] : [];
  const activeFilters = Array.isArray(filters[objKey]) ? filters[objKey] : [];

    // Return nothing if items is null, undefined, or not an array
  if (!Array.isArray(items) || items.length === 0) {
    return <></>;
  }

  const matchBadges = items.map((label, index) => {
    return MatchBadge({ label, key: index, filters: { ...filters, [objKey]: activeFilters }, objKey });
  });
  
  return (
    <Box sx={{ mb: 2, }}>
      <SectionHeader title={title}></SectionHeader>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '50px',
        }}
      >
        {matchBadges}
      </Box>
    </Box>
  );
}

                        