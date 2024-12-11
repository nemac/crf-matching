
import Box from '@mui/material/Box';
import csciLogo from '../assets/CSCI_logo.png';

export default function Logo () {
  return (
    <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            pb: 2,
          }}
        >
          <img
            src={csciLogo}
            alt="CSCI Logo"
            style={{
              width: '175px',
              height: 'auto',
            }}
          />
        </Box>
  )
}