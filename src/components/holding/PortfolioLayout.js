import { Box, Grid } from '@mui/material';
import usePersistentToggle from '@/hooks/sidebars/usePersistentToggle';
import  { CategoryDashboard } from '@/components/holding/CategoryDashboard';
import { BrokerDashboard } from './BrokerDashboard';
import { Navbar } from '@/layouts/holding/portfolio/Navbar';
import { LeftSidebar } from '@/layouts/holding/portfolio/LeftSidebar';

export const PortfolioLayout = () => {

    const [leftSidebarOpen, toggleLeftSidebar] = usePersistentToggle('leftSidebarOpen', false);

    return (
        <Box sx={{ display: 'flex', height: 700 }}>
            <Navbar />
            <Grid container sx={{ mt: 5 }}>
                <LeftSidebar 
                    isOpen={leftSidebarOpen}
                    toggleSidebar={toggleLeftSidebar} 
                />
                <Grid container spacing={2} item xs={9} ml={2} mr={2}>
                    <CategoryDashboard/>
                    <BrokerDashboard/>
                </Grid>
            </Grid>
        </Box>
    );
};

