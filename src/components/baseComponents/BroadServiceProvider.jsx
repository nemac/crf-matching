import { Chip } from '@mui/material';

const BroadServiceProvider = () => {
  return (
    <>
      <Chip
        sx={{
          py: 2,
          px: 2,
          gap: 0.5,
          backgroundColor: '#e6f7ff',
          '& .MuiChip-label': {
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
            fontWeight: '700',
            fontSize: 16,
            color: '#56657D',
          },
          border: 'rounded',
          borderRadius: '9999px',
        }}
        label="Broad service provider"
      />
    </>
  );
};
export default BroadServiceProvider;
