import { Box, Button } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
const CallToActionButton = () => {
  return (
    <Box>
      <Button
        endIcon={<ArrowRightAltOutlinedIcon />}
        sx={{
          color: '#FFFFFF',
          backgroundColor: '#003366',
          '&:hover': {
            bgcolor: '#44619A',
          },
        }}
      >
        Action
      </Button>
    </Box>
  );
};

export default CallToActionButton;
