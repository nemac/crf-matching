import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function MatchScoreBadge(props) {
  const { score = 0, sx = {} } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '4px 8px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '9999px',
        border: '1px solid #6C788D',
        bgcolor: '#F0F2F4',
        color: '#6C788D',
        fontSize: '.8rem',
        fontWeight: 'normal',
        ...sx,
      }}
    >
      <strong>Match Score:</strong>&nbsp;{score}
    </Box>
  );
}

MatchScoreBadge.propTypes = {
  score: PropTypes.number,
  sx: PropTypes.object,
};
