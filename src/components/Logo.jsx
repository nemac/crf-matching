
import Box from '@mui/material/Box';
import csciLogo from '../assets/CSCI_logo.png';
import theme from '../theme.jsx';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Logo () {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const logoWidth = isSmallScreen ? 125 : 175;
  return (
    <Box
          sx={{
            display: 'flex',
            width: 'fit-content',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <a href="/">
            <img
              src={csciLogo}
              alt="Registry of Adaptation Practitioners Logo"
              style={{
                height: 'auto',
                width: `${logoWidth}px`,
              }}
            />
          </a>
        </Box>
  )
}