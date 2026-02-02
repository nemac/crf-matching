import { Box, Button } from '@mui/material';
const CallToActionButton = () => {
  return (
    <Box>
      <Button
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
