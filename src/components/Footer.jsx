import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const registryLinks = [
  { name: 'Search Registry', url: '/Registry' },
  { name: 'All Practitioners', url: '/AllPractitioners' },
  { name: 'Compare Practitioners', url: '/ComparePractitioners' },
];

const resourceLinks = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/About' },
  { name: 'How to apply', url: '/Howtoapply' },
];

function FooterLink(props) {
  const { name, url } = props;

  return (
    <Box
      component={Link}
      to={url}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        height: 35,
        textDecoration: 'none',
      }}
    >
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '16px',
          textDecoration: 'underline',
          color: 'primary.main',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

function FooterColumn(props) {
  const { title, links } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        flex: '1 1 0',
        minWidth: 320,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          px: 0.25,
          height: 25,
          minHeight: 25,
          mb: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: 'text.secondary' }}
        >
          {title}
        </Typography>
      </Box>

      {links.map((link) => (
        <FooterLink key={link.url} name={link.name} url={link.url} />
      ))}
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-center',
        padding: { xs: '24px 24px', md: '24px 96px' },
        gap: '32px',
        width: '100%',
        bgcolor: '#F0F8FF',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Logo />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            padding: 2,
            gap: 2,
          }}
        >
          <FooterColumn title="Registry" links={registryLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 0px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              textAlign: 'center',
              color: 'primary.main',
            }}
          >
            © 2026 Registry of Adaptation Practitioners. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
