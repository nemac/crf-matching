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
          px: 4,
          py: 1,
          backgroundColor: '#66CCFF',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
          borderRadius: '4px',
          textTransform: 'none',
          '&:hover': {
            bgcolor: '#99DDFF',
          },
          '&.Mui-disabled': {
            bgcolor: '#E5E7EB',
            color: '#9CA3AF',
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '18px',
            color: 'primary.main',
            ...textSx,
          }}
        >
          {text ?? 'To be filled'}
        </Typography>
      </Button>
    </>
  );
};
export default AltActionButton;
