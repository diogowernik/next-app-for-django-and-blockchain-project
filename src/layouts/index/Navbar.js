// @layouts/landing_page/Navbar.js

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ResponsiveAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Wallet Tree
          </Typography>
          <Button color="inherit">Introduction</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Privacy</Button>
          <Button color="inherit">Roadmap</Button>
          <Button color="primary" variant="contained" sx={{ marginLeft: '1rem' }}>
            App
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Espaço adicional para compensar a barra fixa */}
    </Box>
  );
};

export default ResponsiveAppBar;
