import React from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const FlexibleSidebarWrapper = ({ isOpen, toggleSidebar, anchor, width, children }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100vh' }}>
            {!isOpen && (
                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        color: 'primary.main',
                        position: 'absolute',
                        top: '70px',
                        [anchor === 'left' ? 'left' : 'right']: '15px', // Aplica a margem correta para ambos os lados
                    }}
                >
                    {anchor === 'left' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            )}
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={isOpen}
                sx={{
                    width: isOpen ? width : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width, boxSizing: 'border-box' },
                }}
            >
                {isOpen && (
                    <Box sx={{ display: 'flex', justifyContent: anchor === 'left' ? 'flex-end' : 'flex-start', padding: '1px', mt: '8px' }}>
                        <IconButton onClick={toggleSidebar} sx={{ color: 'primary.main' }}>
                            {anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Box>
                )}
                {children}
            </Drawer>
        </Box>
    );
};
