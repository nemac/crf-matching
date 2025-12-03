import { Box, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function FormTextField({ label, value, onChange, name, type = 'text', fullWidth = false }) {
  return (
    <Box sx={{ minWidth: fullWidth ? '100%' : '240px', flex: fullWidth ? 1 : 'none' }}>
      <Box
        component="label"
        sx={{
          display: 'block',
          mb: 0.5,
          fontSize: '0.875rem',
          color: 'text.secondary',
        }}
      >
        {label}
      </Box>
      <TextField
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  bgcolor: '#0066CC',
                  color: 'white',
                  borderRadius: '4px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EditIcon sx={{ fontSize: '18px' }} />
              </Box>
            </InputAdornment>
          ),
          sx: {
            bgcolor: '#F9FAFB',
            borderRadius: '4px',
            height: '43px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0066CC',
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0066CC',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0066CC',
              borderWidth: '1px',
            },
            '& input': {
              padding: '4px 8px',
              height: '100%',
              boxSizing: 'border-box',
            },
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            gap: '12px',
            paddingRight: '8px',
          },
        }}
      />
    </Box>
  );
}