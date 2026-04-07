import { Button } from '@mui/material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
const AltButton = () => {
  return (
    <>
      <Button
        startIcon={<VpnKeyOutlinedIcon />}
        sx={{
          px: 1,
          py: 2,
          gap: 0.5,
          backgroundColor: '#66CCFF',
          '&:hover': {
            bgcolor: '#99DDFF',
          },
          my: '20px',
          ml: '20px',
        }}
      >
        Get
      </Button>
    </>
  );
};

export default AltButton;
