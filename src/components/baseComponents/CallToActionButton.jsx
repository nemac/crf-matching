import { Button, Typography } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Link as RouterLink } from 'react-router-dom';
const CallToActionButton = props => {
  const { text, textSx, buttonSx, to, iconStart, iconEnd, onClick } = props;
  return (
    <>
      <Button
        startIcon={iconStart}
        endIcon={iconEnd}
        component={to ? RouterLink : 'button'}
        to={to}
        onClick={onClick}
        sx={{
          color: '#FFFFFF',
          py: 1,
          px: 3,
          textTransform: 'none',
          backgroundColor: 'primary.ctaDarkBlue',
          '&:hover': {
            bgcolor: '#44619A',
          },
          ...buttonSx,
        }}
      >
        <Typography sx={{ color: 'inherit', mb: 0, ...textSx }}>{text ?? 'To be filled'}</Typography>
      </Button>
    </>
  );
};

export default CallToActionButton;
