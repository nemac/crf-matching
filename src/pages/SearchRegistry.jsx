import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import NavBar from '../components/NavBar';
import { useSearchParams } from 'react-router-dom';

const SearchRegistry = () => {
  const [searchParams] = useSearchParams();

  const community = searchParams.get('community') ?? '';
  const activities = searchParams.get('activities')?.split(',') ?? [];
  const hazards = searchParams.get('hazards')?.split(',') ?? [];
  const sectors = searchParams.get('sectors')?.split(',') ?? [];

  const FilterSection = ({ title, values }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', fontSize: 11, letterSpacing: '0.07em' }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        {values.length > 0 ? (
          values.map((v, i) => (
            <Chip key={i} label={v} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ color: 'text.disabled', fontStyle: 'italic' }}
          >
            None selected
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <NavBar />
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              fontSize: 11,
              letterSpacing: '0.07em',
            }}
          >
            Community
          </Typography>
          <Typography variant="h6" sx={{ mt: 0.5 }}>
            {community || '—'}
          </Typography>
        </Box>
        <FilterSection title="Services" values={activities} />
        <FilterSection title="Hazards" values={hazards} />
        <FilterSection title="Sectors" values={sectors} />
      </Box>
    </>
  );
};

export default SearchRegistry;
