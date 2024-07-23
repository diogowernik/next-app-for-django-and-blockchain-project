import React from 'react';
import { LeftSidebarWrapper } from '@/layouts/shared/LeftSidebarWrapper';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

// Utilize a prop handleDashboardChange nos ListItemButton
export const LeftSidebar = ({ isOpen, toggleSidebar, handleDashboardChange }) => {
    return (
        <LeftSidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar} width={240}>
            <List sx={{ width: '100%' }}>
                <ListItem>
                    <ListItemText primary={<Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>Meu Portfolio</Typography>} />
                </ListItem>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('category')}>
                    <ListItemText primary="Index" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('broker')}>
                    <ListItemText primary="Brokers" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('geolocation')}>
                    <ListItemText primary="GeoLocation" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('dividends')}>
                    <ListItemText primary="Dividends By Month" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('category-dividends')}>
                    <ListItemText primary="Dividends By Category" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('dividends-by-year')}>
                    <ListItemText primary="Dividends By Year" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleDashboardChange('valuation')}>
                    <ListItemText primary="Valuation" />
                </ListItemButton>
            </List>          
        </LeftSidebarWrapper>
    );
};

