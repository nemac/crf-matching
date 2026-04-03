import { Box, Typography } from '@mui/material';

export default function FeatureCard(props) {
  const { icon, title, description } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: 320,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          height: 40,
          backgroundColor: 'primary.ctaDarkBlue',
          borderRadius: '50%',
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          pt: 1.5,
          gap: 0.5,
          alignSelf: 'stretch',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            minHeight: 25,
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: 'center' }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            px: '5px',
            minHeight: 75,
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
