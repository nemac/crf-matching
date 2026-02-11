import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderLink = props => {
  const { name, url, matches } = props;
  return (
    <>
      <Chip
        sx={{
            backgroundColor :'transparent',
          '& .MuiChip-label': {
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: 16,
          },
          border: 'rounded',
          '&:hover': {
              backgroundColor: '#F1ECE4',
        },
          borderRadius: '99px',
        }}
        label={name || 'Default'}
        component={Link}
        to={url}
        clickable
      />
    </>
  );
};
export default HeaderLink;
