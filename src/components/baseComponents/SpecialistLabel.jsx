import { Chip } from '@mui/material';

const SpecialistLabel = () => {
  return (
    <>
      <Chip
        sx={{
          py: 2,
          px: 2,
          gap: '4px',
          backgroundColor: '#ffead5',
          '& .MuiChip-label': {
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
            fontWeight: 700,
            color: '#56657D',
            fontSize: 16,
          },

          border: 'rounded',
          borderRadius: '9999px',
        }}
        label="Specialist"
      />
    </>
  );
};
export default SpecialistLabel;
