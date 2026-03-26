import { Box, Typography } from '@mui/material';

export default function PageHeader(props) {
  const { title, subtitle } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: 2,
        mt: 4,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '56px',
          textAlign: 'center',
          color: 'primary.main',
          flexGrow: 1,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 18,
            lineHeight: '21px',
            textAlign: 'center',
            color: 'text.secondary',
            flexGrow: 1,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
