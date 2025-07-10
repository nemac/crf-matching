import { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Registry from './Registry.jsx';
import AboutPage from './AboutPage.jsx';
import Logo from '../components/Logo.jsx';
import theme from '../theme.jsx';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const logoWidth = isSmallScreen ? 125 : 180;
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
      <Container maxWidth="lg"> 
        <Toolbar sx={{ gap: 3, maxWidth: "lg"}}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',              
              width: `${logoWidth}px`,
              py: 1,
              pt: 2,
              pb: 1,
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
              component={Link}
              to="/about"
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

            <Button
              component={Link}
              to="/about"
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '1rem',
                padding: 0,
                minWidth: 0,
                textDecoration: pageSelect === 'howtoapply' ? 'underline' : 'none',
                fontWeight: pageSelect === 'howtoapply' ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => {
                setPageSelect('howtoapply');

              }}
            >
              How to Apply
            </Button>
            
          </Box>
        </Toolbar>
        </Container> 
      </AppBar>
      {pageSelect === 'registry' ? <Registry /> : <AboutPage />}
      </>
  );
}
