import { Button } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
const CallToActionButton = () => {
  return (
    <>
      <Button
        endIcon={<ArrowRightAltOutlinedIcon />}
        sx={{
          height: '46px',
          width: '132px',
          color: '#FFFFFF',
          backgroundColor: '#003366',
          '&:hover': {
            bgcolor: '#44619A',
          },
        }}
      >
        Action
      </Button>
    </>
  );
};

export default CallToActionButton;
