import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AltActionButton = props => {
  const { text, textSx, to, onClick, disabled } = props;
  return (
    <>
      <Button
        component={to ? RouterLink : 'button'}
        to={to}
        onClick={onClick}
        disabled={disabled}
        sx={{
          width: 'auto',
          height: '32px',
          pt: '8px',
          pb: '8px',
          backgroundColor: '#66CCFF',
          '&:hover': {
            bgcolor: '#99DDFF',
          },
          '&.Mui-disabled': {
            bgcolor: '#E5E7EB',
            color: '#9CA3AF',
          },
        }}
      >
        <Typography sx={textSx}>{text ?? 'To be filled'}</Typography>
      </Button>
    </>
  );
};
export default AltActionButton;
