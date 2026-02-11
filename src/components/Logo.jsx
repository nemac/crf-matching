
import Box from '@mui/material/Box';
import csciLogo from '../assets/Registry_Logo_new.png';
import theme from '../theme.jsx';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


export default function Logo () {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const logoWidth = isSmallScreen ? 56 : 86;
  const params = window.location.search || '';
  return (
    <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: {xs: 'center', sm: 'flex-start', md: 'flex-start'},
            p: 2,
                gap:1
          }}
        >
          <Link to={'/Registry' + params}>
            <img
              src={csciLogo}
              alt="Registry of Adaptation Practitioners Logo"
              style={{
                margin: '0 auto',
                height: 'auto',
                width: `${logoWidth}px`,
              }}
            />
          </Link>
            <Typography  width={321} height={23}>
                Registry of Adaptation Practitioners
            </Typography>
        </Box>
  )
}
