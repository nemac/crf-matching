
import Box from '@mui/material/Box';
import csciLogo from '../assets/Registry_Logo_primary_RGB.jpg';
import theme from '../theme.jsx';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Logo () {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const logoWidth = isSmallScreen ? 150 : 180;
  return (
    <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: {xs: 'center', sm: 'flex-start', md: 'flex-start'},
            p: 2
          }}
        >
          <a href="/Registry">
            <img
              src={csciLogo}
              alt="Registry of Adaptation Practitioners Logo"
              style={{
                margin: '0 auto',
                height: 'auto',
                width: `${logoWidth}px`,
              }}
            />
          </a>
        </Box>
  )
}