// @layouts/dex/LeftSidebar.js

import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LeftSidebarWrapper } from '@/layouts/shared/LeftSidebarWrapper'; 

import SettingsIcon from '@mui/icons-material/Settings';
import CallMadeIcon from '@mui/icons-material/CallMade';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const LeftSidebar = ({ isOpen, toggleSidebar, handleDashboardChange }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <LeftSidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar} width={240}>
                <List>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('dashboard')}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('wallets')}>
                        <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                        <ListItemText primary="My Wallets" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('my-pages')}>
                        <ListItemIcon><DescriptionIcon /></ListItemIcon>
                        <ListItemText primary="My Pages" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('create-page')}>
                        <ListItemIcon><AddBoxIcon /></ListItemIcon>
                        <ListItemText primary="Create Page" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('analytics')}>
                        <ListItemIcon><AnalyticsIcon /></ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('receivedDonations')}>
                        <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                        <ListItemText primary="Received" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('sentDonations')}>
                        <ListItemIcon><CallMadeIcon /></ListItemIcon>
                        <ListItemText primary="Sent" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('settings')}>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </List>
            </LeftSidebarWrapper>
        </Box>
    );
}
