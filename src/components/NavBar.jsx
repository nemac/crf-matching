import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../components/Logo.jsx';
import theme from '../theme';
import { searchParamsToFilters } from '../util/urlStateManagement';
import HeaderLink from './baseComponents/HeaderLink.jsx';

const drawerWidth = 240;
const navItems = [
  {
    name: 'Home',
    url: '/',
    matches: ['/'],
    resetParams: true,
  },
  {
    name: 'Search Registry',
    url: '/Registry',
    matches: ['/Registry', '/practitionerworkexamplepage', '/practitioner'],
  },
  {
    name: 'All Practitioners',
    url: '/AllPractitioners',
    matches: ['/AllPractitioners'],
    resetParams: true,
  },
  {
    name: 'Compare Practitioners',
    url: '/ComparePractitioners',
    matches: ['/ComparePractitioners'],
    resetParams: true,
  },
  {
    name: 'How to Apply',
    url: '/Howtoapply',
    matches: ['/Howtoapply'],
    resetParams: true,
  },
  {
    name: 'About',
    url: '/About',
    matches: ['/About'],
    resetParams: true,
  },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pageSelect, setPageSelect] = useState(
    location.pathname || '/Registry'
  );

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const params = window.location.search || '';

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', color: 'primary.main' }}
    >
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem
            key={i}
            to={item.resetParams ? item.url : item.url + params}
            component={Link}
            disablePadding
            onClick={() => {
              setPageSelect(`${item.url}`);
            }}
          >
            <ListItemButton>
              <ListItemText
                disableTypography
                primary={item.name}
                sx={{
                  px: 2.5,
                  py: 0.5,
                  color: 'primary.main',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  backgroundColor: item.matches.includes(
                    `/${pageSelect?.split('?')[0]?.split('#')[0]?.split('/')[1]}`
                  )
                    ? 'primary.cellHoverBg'
                    : 'unset',
                  textDecoration: item.matches.includes(
                    `/${pageSelect?.split('?')[0]?.split('#')[0]?.split('/')[1]}`
                  )
                    ? 'none'
                    : 'none',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', color: 'primary.main' }}>
      <AppBar
        position="static"
        component="nav"
        sx={{
          bgcolor: 'primary.sectionBg',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: '0px -3px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, s: 3 },
            minHeight: '67px !important',
            height: '67px',
          }}
        >
          <IconButton
            color="primary.main"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: {xs: 0, sm:2}, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              flexGrow: { xs: 1, md: 0 },
              justifyContent: 'flex-start',
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'row',
              alignItems: 'center',
              p: 2,
              gap: { md: 0.5, lg: 1.5 },
            }}
          >
            {navItems.map((item, i) => (
              <HeaderLink
                name={item.name}
                url={item.resetParams ? item.url : item.url + params}
                matches={item.matches}
                key={i}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
