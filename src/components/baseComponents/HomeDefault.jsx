import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const preventDefault = (event) => event.preventDefault();

export default function Links() {
  return (
    <Box
      sx={{
        typography: 'body1',
        '& > :not(style) ~ :not(style)': {
          ml: 2,
        },
      }}
      onClick={preventDefault}
    >
      <Link component={RouterLink} to='/' underline='hover'>Home</Link>
    </Box>
  );
}

