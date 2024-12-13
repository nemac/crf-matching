import { Snackbar } from '@mui/material';
import theme from '../theme';

export default function Toast({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.white,
        },
      }}
    />
  );
}
