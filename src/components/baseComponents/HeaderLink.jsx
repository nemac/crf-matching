import { Chip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const HeaderLink = props => {
  const { name, url, matches } = props;
  const location = useLocation();
  const currentPath = '/' + (location.pathname.split('/')[1] || '');
  const isActive = matches
    ? matches.some(m => currentPath === m || location.pathname.startsWith(m + '/'))
    : currentPath === url.split('?')[0];

  return (
    <Chip
      sx={{
        backgroundColor: isActive ? '#F1ECE4' : 'transparent',
        px: isActive ? 0.5 : 0,
        height: '35px',
        '& .MuiChip-label': {
          overflow: 'visible',
          textOverflow: 'unset',
          whiteSpace: 'nowrap',
          fontFamily: 'Roboto',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          color: 'primary.main',
        },
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
  );
};
export default HeaderLink;
