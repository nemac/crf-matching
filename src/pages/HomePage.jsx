import { useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Registry from './Registry.jsx';
import AboutPage from './AboutPage.jsx';
import Logo from '../components/Logo.jsx';
import theme from '../theme.jsx';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [pageSelect, setPageSelect] = useState('registry');
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: 'primary.white',
          boxShadow: 1,
          borderBottom: `1px solid ${theme.palette.primary.borderGray}`,
        }}
      >
        <Toolbar sx={{ gap: 3 }}>
          {/* Logo */}
          <Box
            sx={{
              width: 175,
              py: 1,
            }}
          >
            <Logo />
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Button
              //component={Link}
              //to="/"
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '1rem',
                padding: 0,
                minWidth: 0,
                textDecoration: pageSelect === 'registry' ? 'underline' : 'none',
                fontWeight: pageSelect === 'registry' ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                setPageSelect('registry');
              }}
            >
              {isSmallScreen ? ( 'Registry' ) : ( 'Registry of Adaptation Practitioners' )}
            </Button>

            <Button
              //component={Link}
              //to="/about"
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '1rem',
                padding: 0,
                minWidth: 0,
                textDecoration: pageSelect === 'about' ? 'underline' : 'none',
                fontWeight: pageSelect === 'about' ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                setPageSelect('about');
              }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {pageSelect === 'registry' ? <Registry /> : <AboutPage />}
    </>
  );
}
