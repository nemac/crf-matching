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
        width: '100%',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'flex-start', md: 'flex-start' },
        p: 2,
        gap: 1,
      }}
    >
<<<<<<< HEAD
      <Link to={`/Registry${params}`}>
=======
      <Link to="/">
>>>>>>> 7090038 (Fixed issues from last meeting)
        <img
          src={csciLogo}
          alt="Registry of Adaptation Practitioners Logo"
          style={{
<<<<<<< HEAD
            margin: '0 auto',
            height: 'auto',
=======
            height: 'auto',
            display: 'block',
>>>>>>> 7090038 (Fixed issues from last meeting)
            width: `${logoWidth}px`,
          }}
        />
      </Link>
<<<<<<< HEAD
      <Typography>Registry of Adaptation Practitioners</Typography>
=======
      <Typography width={321} height={23}>
        Registry of Adaptation Practitioners
      </Typography>
>>>>>>> 7090038 (Fixed issues from last meeting)
    </Box>
  );
}
