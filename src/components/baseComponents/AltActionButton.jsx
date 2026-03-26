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
          width: 230,
          height: 37,
          padding: '8px 0px',
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
            lineHeight: '21px',
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
