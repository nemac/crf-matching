import React, { useState } from 'react';
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

const drawerWidth = 240;
const navItems = [
  {
    name: 'Registry of Adaptation Practitioners',
    url: '/Registry',
  }, {
    name: 'How to apply',
    url: '/Howtoapply',
  },{
    name: 'About',
    url: '/About',    
  }, 
]

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pageSelect, setPageSelect] = useState(location.pathname || '/Registry');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: 'primary.main', }}>
      <Logo />
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} to={item.url} component={Link} disablePadding onClick={() => {setPageSelect(`${item.url}`);}}>
            <ListItemButton >
              <ListItemText
                disableTypography={true}
                primary={item.name}
                 sx={{ 
                  color: 'primary.main', 
                  textTransform: 'capitalize', 
                  fontSize: '1rem', 
                  fontWeight: pageSelect === `${item.url}` ? 'bold' : 'none' ,
                  textDecoration: pageSelect === `${item.url}` ? 'underline' : 'none'}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', color: 'primary.main', }}>
      <AppBar position="static" component="nav" sx={{ bgcolor: 'primary.white' }}>
        <Toolbar>
          <IconButton
            color='primary.main'
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, alignContent: 'center', display: { xs: 'none', sm: 'block', color: 'black' } }}
          >
            <Logo onClick={() => {setPageSelect('/Registry');}}/>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, i) => (
              <Button
                component={Link}
                to={item.url}
                key={i}
                onClick={() => {setPageSelect(`${item.url}`);}}
                sx={{ 
                  marginRight: theme.spacing(2),
                  color: 'primary.main', 
                  textTransform: 'capitalize', 
                  fontSize: '1rem', 
                  fontWeight: pageSelect === `${item.url}` ? 'bold' : 'none' ,
                  textDecoration: pageSelect === `${item.url}` ? 'underline' : 'none' }}>
                {item.name}
              </Button>
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}