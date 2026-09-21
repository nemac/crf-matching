import { Box, Chip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const HeaderLink = props => {
  const { name, shortName, url, matches } = props;
  const location = useLocation();
  const currentPath = '/' + (location.pathname.split('/')[1] || '');
  const isActive = matches
    ? matches.some(m => currentPath === m || location.pathname.startsWith(m + '/'))
    : currentPath === url.split('?')[0];

  const label = shortName ? (
    <>
      <Box component="span" sx={{ display: { xs: 'inline', xl: 'none' } }}>
        {shortName}
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', xl: 'inline' } }}>
        {name}
      </Box>
    </>
  ) : (
    name
  );

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
          fontWeight: 400,
          fontSize: { md: '13px', lg: '16px' },
          color: 'primary.main',
          px: { md: 0.5, lg: 1 },
        },
        '&:hover': {
          backgroundColor: '#F1ECE4',
        },
        borderRadius: '99px',
      }}
      label={label}
      component={Link}
      to={url}
      clickable
    />
  );
};
export default HeaderLink;
