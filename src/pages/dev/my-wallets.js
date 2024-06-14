import dynamic from 'next/dynamic';
import { Grid, Typography } from '@mui/material';
import MainLayout from '@/layouts/dex/dashboard/MainLayout';

const MyWalletsPage = () => {
    const WalletsGridBTC = dynamic(() => import('@/components/wallets/WalletsGridBTC'), { ssr: false });
    const WalletsGridEVM = dynamic(() => import('@/components/wallets/WalletsGridEVM'), { ssr: false });

    return (
        <MainLayout>
        <div style={{ width: '100%', margin: '0 auto' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                My Wallets
            </Typography>
            <p>
                Connect to your favorite wallet provider to manage your assets.
            </p>
            <Grid container spacing={2}>
                <WalletsGridBTC />
                <WalletsGridEVM />
            </Grid>
        </div>
        </MainLayout>
    );
};

export default MyWalletsPage;
