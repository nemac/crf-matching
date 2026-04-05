import Box from '@mui/material/Box';
import csciLogo from '../assets/Registry_Logo_new.png';
import theme from '../theme.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function Logo() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const logoWidth = isSmallScreen ? 56 : 86;
  const params = window.location.search || '';
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <img
          src={csciLogo}
          alt="Registry of Adaptation Practitioners Logo"
          style={{
            height: 'auto',
            display: 'block',
            width: `${logoWidth}px`,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            whiteSpace: 'nowrap',
            display: 'block',
            fontSize: { xs: '16px', md: '16px', lg: '20px' },
          }}
        >
          Registry of Adaptation Practitioners
        </Typography>
      </Box>
    </Link>
  );
}
