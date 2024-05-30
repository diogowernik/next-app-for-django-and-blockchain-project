// @/layouts/shared/LeftSidebarWrapper

import React from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const LeftSidebarWrapper = ({ isOpen, toggleSidebar, width = 240, children }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100vh' }}>
            {!isOpen && (
                <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main', margin: '0px 0 0 15px' }}> 
                    <ChevronRightIcon />
                </IconButton>
            )}
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                sx={{
                    width: isOpen ? width : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: width, boxSizing: 'border-box' },
                }}
            >
                {isOpen && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1, mt: 9 }}>
                        <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main' }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                )}
                {children}
            </Drawer>
        </Box>
    );
};
