import { Box, Typography } from '@mui/material';
import TertiaryButton from './baseComponents/TertiaryButton';

export default function IncludedInRegistry() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
        px: 3,
        gap: 6,
        bgcolor: 'primary.ctaDarkBlue',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: { xs: '32px', md: '48px' },
            lineHeight: { xs: '40px', md: '56px' },
            textAlign: 'center',
            color: '#FFFFFF',
          }}
        >
          Want to be included in the Registry?
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '21px',
            textAlign: 'center',
            color: '#FFFFFF',
          }}
        >
          Be recognized as an expert helping communities build a more resilient
          future!
        </Typography>
      </Box>

      <TertiaryButton
        href="https://www.surveymonkey.com/r/adaptation-registry"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          px: 3,
          py: 2,
          fontFamily: 'Roboto',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '21px',
          color: 'primary.ctaDarkBlue',
          textTransform: 'none',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px',
        }}
      >
        Apply to the Registry
      </TertiaryButton>
    </Box>
  );
}
