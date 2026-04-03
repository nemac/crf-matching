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
        mt: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: 'center',
          flexGrow: 1,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" component="div">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
