import { Button, Typography } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Link as RouterLink } from 'react-router-dom';
const CallToActionButton = props => {
  const { text, textSx, to } = props;
  return (
    <>
      <Button
        endIcon={<ArrowRightAltOutlinedIcon />}
        componet={to ? RouterLink : 'button'}
        to={to}
        sx={{
          height: '46px',
          width: 'auto',
          color: '#FFFFFF',
          pt: '4px',
          pl: '12px',
          pb: '4px',
          pr: '12px',
          gap: '16px',
          backgroundColor: '#003366',
          '&:hover': {
            bgcolor: '#44619A',
          },
        }}
      >
        <Typography sx={textSx}>{text ?? 'To be filled'}</Typography>
      </Button>
    </>
  );
};

export default CallToActionButton;
