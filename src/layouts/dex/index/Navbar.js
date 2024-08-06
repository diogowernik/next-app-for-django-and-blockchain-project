import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ResponsiveAppBar = () => {
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src="/grey-logo.png" alt="Wallet Tree Logo" style={{ height: '25px', marginRight: '20px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Wallet Tree
          </Typography>
          <Button color="inherit" onClick={() => scrollToSection('#introduction')}>Introduction</Button>
          <Button color="inherit" onClick={() => scrollToSection('#profile')}>Profile</Button>
          <Button color="inherit" onClick={() => scrollToSection('#privacy')}>Privacy</Button>
          <Button color="inherit" onClick={() => scrollToSection('#roadmap')}>Roadmap</Button>
          {/* ON click go to /dex  */}
          {/* <Button color="primary" variant="contained" sx={{ marginLeft: '1rem' }}>
            Dex
          </Button> */}
          <Button color="primary" variant="contained" sx={{ marginLeft: '1rem' }} onClick={() => window.location.href = '/dex'}>
            Dex
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Espaço adicional para compensar a barra fixa */}
    </Box>
  );
};

export default ResponsiveAppBar;
