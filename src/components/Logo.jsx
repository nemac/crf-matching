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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Link to="/">
        <img
          src={csciLogo}
          alt="Registry of Adaptation Practitioners Logo"
          style={{
            height: 'auto',
            display: 'block',
            width: `${logoWidth}px`,
          }}
        />
      </Link>
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: '20px',
          lineHeight: '23px',
          color: 'primary.main',
          whiteSpace: 'nowrap',
        }}
      >
        Registry of Adaptation Practitioners
      </Typography>
    </Box>
  );
}
