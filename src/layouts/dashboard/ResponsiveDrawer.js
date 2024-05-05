// @layouts/dashboard/ResponsiveDrawer.js

import React from 'react';
import { Box, Avatar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import menuItems from './MenuItems';
import DashboardNavbar from './DashboardNavbar';
import { useAuth } from '@/context/AuthContext'; // Importando o hook do contexto

const drawerWidth = 240;

function ResponsiveDrawer({ children }) {
  const { metamaskUserAddress } = useAuth(); // Usando o endereço da carteira do contexto

  // Função para formatar o endereço da carteira
  const formatWalletAddress = (address) => {
    // Verifica se o endereço está disponível antes de formatar
    if (!address) return "Loading...";  // Ou pode usar um loader, ex: return <CircularProgress size={20} />;
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNavbar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar sx={{marginTop:3}} />
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)', marginBottom:2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AccountCircleIcon sx={{ fontSize: 70 }} />
          </Avatar>
          <Typography variant="caption" sx={{ marginTop: 2, fontSize: '1rem', fontWeight: 'bold', color: 'primary.main' }}>
            {formatWalletAddress(metamaskUserAddress)}
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItemButton key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
