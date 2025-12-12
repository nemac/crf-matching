import { Box, FormControl, Select, MenuItem, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';

export default function FormSelect({ label, value, onChange, name, options, fullWidth = false }) {
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
      <FormControl fullWidth>
        <Select
          variant="outlined"
          name={name}
          value={value || ''}
          onChange={onChange}
          displayEmpty
          sx={{
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
            '& .MuiSelect-select': {
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
            },
            paddingRight: '8px',
            gap: '12px',
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  fullWidth: PropTypes.bool,
};
