// @/layouts/shared/RightSidebarWrapper.js

import React from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const RightSidebarWrapper = ({ isOpen, toggleSidebar, width = 360, children }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100vh' }}>
            {!isOpen && (
                <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main', margin: '18px 25px 0px 0px', position: 'absolute', right: 0, top: 70 }}>
                    <ChevronLeftIcon />
                </IconButton>
            )}
            <Drawer
                variant="persistent"
                anchor="right"
                open={isOpen}
                sx={{
                    width: isOpen ? width : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: width, boxSizing: 'border-box' },
                }}
            >
                {isOpen && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: 1, mt: 10 }}>
                        <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main' }}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                )}
                {children}
            </Drawer>
        </Box>
    );
};
