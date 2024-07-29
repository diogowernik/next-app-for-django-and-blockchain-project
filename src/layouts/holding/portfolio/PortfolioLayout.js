import React from 'react';
import { Box, Grid } from '@mui/material';
import usePersistentToggle from '@/hooks/sidebars/usePersistentToggle';
import { Navbar } from '@/layouts/holding/portfolio/Navbar';
import { LeftSidebar } from '@/layouts/holding/portfolio/LeftSidebar';

export const PortfolioLayout = ({ children, handleDashboardChange }) => {
    const [leftSidebarOpen, toggleLeftSidebar] = usePersistentToggle('leftSidebarOpen', false);

    return (
        <Box sx={{ display: 'flex', height: '100%', flexGrow: 1 }}>
            <Navbar />
            <Grid container sx={{ flexGrow: 1, mt: 5 }}>
                <Grid item sx={{ width: leftSidebarOpen ? '250px' : '50px', transition: 'width 0.3s' }}>
                    <LeftSidebar 
                        isOpen={leftSidebarOpen}
                        toggleSidebar={toggleLeftSidebar}
                        handleDashboardChange={handleDashboardChange}  // Passando a função para o LeftSidebar
                    />
                </Grid>
                <Grid item xs sx={{ overflow: 'auto', p: 2, mt: 4 }}>
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};