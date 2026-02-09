import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderLink = props => {
  const { name, url, matches } = props;
  return (
    <>
      <Chip
        sx={{
          height: '59px',
          pt: '12px',
          pr: '24px',
          pb: '12px',
          pl: '24px',
          gap: '10px',
          backgroundColor: '#F1ECE4',
          '& .MuiChip-label': {
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: 16,
            '&:hover': {
              textDecoration: 'underline',
            },
          },
          border: 'rounded',
          borderRadius: '99px',
        }}
        label={name || 'Default'}
        component={Link}
        to="/"
        clickable
      />
    </>
  );
};
export default HeaderLink;
