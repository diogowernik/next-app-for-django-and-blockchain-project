// @layouts/hodling/admin/Navbar.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';
import { WtreeIcon } from '@/components/dex/ui/WtreeIcon';

export const Navbar = () => {

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <WtreeIcon color="white" width="90px" />
        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: '20px' }}>
          Holding Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

