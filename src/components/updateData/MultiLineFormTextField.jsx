import { Box, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

export default function MultiLineFormTextField({ label, value, onChange, name, rows = 3, placeholder }) {
  return (
    <Box sx={{ minWidth: '240px', maxWidth: '856px', width: '100%' }}>
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
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        fullWidth
        multiline
        rows={rows}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                alignSelf: 'center',
              }}
            >
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
            minHeight: '81px',
            alignItems: 'flex-start',
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
            '& textarea': {
              padding: '4px 8px',
            },
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            gap: '12px',
            paddingRight: '8px',
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '8px',
          },
        }}
      />
    </Box>
  );
}

MultiLineFormTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
};