import { Chip } from '@mui/material';

const SpecialistLabel = () => {
  return (
    <>
      <Chip
        sx={{
          width: '118px',
          height: '51px',
          pt: '16px',
          pr: '24px',
          pb: '16px',
          pl: '24px',
          gap: '4px',
          backgroundColor: '#FFDDBB',
          '& .MuiChip-label': {
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
            fontWeight: 700,
            color: '#1F2C35',
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
