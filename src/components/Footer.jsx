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
        padding: '8px',
        height: 35,
        textDecoration: 'none',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '19px',
          textDecoration: 'underline',
          color: '#2D3F5D',
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
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '23px',
            color: '#56657D',
          }}
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
        alignItems: 'flex-start',
        padding: { xs: '48px 24px', md: '48px 96px' },
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
          alignSelf: 'stretch',
        }}
      >
        <Logo />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            padding: '16px',
            gap: '26px',
            alignSelf: 'stretch',
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
          alignSelf: 'stretch',
          height: 57,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px 0px',
            alignSelf: 'stretch',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              textAlign: 'center',
              color: '#2D3F5D',
            }}
          >
            © 2025 Registry of Adaptation Practitioners. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
