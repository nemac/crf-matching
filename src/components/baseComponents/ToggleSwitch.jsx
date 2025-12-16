import { Box, Switch } from '@mui/material';
import PropTypes from 'prop-types';

export default function ToggleSwitch({ label, value, onChange, name }) {
  const isYes = value === 'Yes';

  const handleToggle = () => {
    const newValue = isYes ? 'No' : 'Yes';
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <Box>
      {label && (
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
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: isYes ? 600 : 400,
            color: isYes ? '#0066CC' : '#9CA3AF',
          }}
        >
          Yes
        </Box>
        <Switch
          checked={!isYes}
          onChange={handleToggle}
          sx={{
            width: '72px',
            height: '28px',
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: '2px',
              margin: 0,
              transitionDuration: '300ms',
              '&.Mui-checked': {
                transform: 'translateX(44px)',
                color: '#0066CC',
                '& + .MuiSwitch-track': {
                  backgroundColor: '#66CCFF',
                  opacity: 1,
                  border: '1px solid #66CCFF',
                },
              },
              '&:not(.Mui-checked)': {
                color: '#0066CC',
              },
            },
            '& .MuiSwitch-thumb': {
              width: 24,
              height: 24,
            },
            '& .MuiSwitch-track': {
              borderRadius: '9999px',
              backgroundColor: '#66CCFF',
              opacity: 1,
              border: '1px solid #66CCFF',
            },
          }}
        />
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: !isYes ? 600 : 400,
            color: !isYes ? '#0066CC' : '#9CA3AF',
          }}
        >
          No
        </Box>
      </Box>
    </Box>
  );
}

ToggleSwitch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOf(['Yes', 'No']).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};