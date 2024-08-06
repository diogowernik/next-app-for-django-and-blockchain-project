import dynamic from 'next/dynamic';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import WalletsGridWtree from '@/components/wallets/WalletsGridWtree';

export const WalletsDashboard = () => {
    const [loading, setLoading] = useState(true);
    const WalletsGridBTC = dynamic(() => import('@/components/wallets/WalletsGridBTC'), { ssr: false });
    const WalletsGridEVM = dynamic(() => import('@/components/wallets/WalletsGridEVM'), { ssr: false });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{ marginLeft: '30px', marginTop: '30px' }}>
                    <div style={{ marginLeft: '15px' }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            My Wallets
                        </Typography>
                        <p>
                            Connect to your wallets and save them to receive donations on your Wallet Tree Page.
                        </p>
                    </div>
                    <Grid container spacing={2}>
                        <WalletsGridBTC />
                        <WalletsGridEVM />
                        <WalletsGridWtree />
                    </Grid>
                </div>
            )}
        </div>
    );
};

