import { Chip } from '@mui/material';

const BroadServiceProvider = () => {
  return (
    <>
      <Chip
        sx={{
          width: '210px',
          height: '51px',
          pt: '16px',
          pr: '24px',
          pb: '16px',
          pl: '24px',
          gap: '4px',
          backgroundColor: '#66CCFF',
          '& .MuiChip-label': {
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
            fontWeight: '700',
            fontSize: 16,
            color: 'primary.linkBlue',
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
