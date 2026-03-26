import { Box, Typography } from '@mui/material';

export default function FeatureCard(props) {
  const { icon, title, description } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '18px',
        width: 320,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 52,
          height: 52,
          backgroundColor: '#003366',
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
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '23px',
              textAlign: 'center',
              color: '#101828',
            }}
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
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              textAlign: 'center',
              color: '#56657D',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
