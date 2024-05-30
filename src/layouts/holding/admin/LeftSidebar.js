// @/components/layout/LeftSidebar.js

import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const LeftSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            {!isOpen && (
                <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main' }}>
                    <ChevronRightIcon />
                </IconButton>
            )}
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                sx={{
                    width: isOpen ? 240 : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
                }}
            >
                {isOpen && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1, mt: 8 }}>
                        <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main' }}>
                            <ChevronLeftIcon /> 
                        </IconButton>
                    </Box>
                )}
                <List>
                    <ListItem><ListItemText primary="Admin" /></ListItem>
                    <ListItem button><ListItemText primary="Portfolio Assets" /></ListItem>
                    <ListItem button><ListItemText primary="Portfolio History" /></ListItem>
                    <ListItem button><ListItemText primary="Portfolio Evolution" /></ListItem>
                </List>
            </Drawer>
        </Box>
    );
};
