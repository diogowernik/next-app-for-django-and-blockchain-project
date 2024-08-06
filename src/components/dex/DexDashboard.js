import React, { useState } from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import { CreatePageInput } from '@/components/profile/form/CreatePageInput';
import { MyWallets } from '@/components/wallets/MyWallets';
import { MyProfilePages } from '@/components/profile/MyProfilePages';
import { Ads1 } from '@/ads/Ads1';
import { Ads2 } from '@/ads/Ads2';


export const DexDashboard = ({ handleDashboardChange }) => {
    const [username, setUsername] = useState('');

    return (
        <Container maxWidth="xl" style={{ marginTop: '20px' }}>
            <div style={{ marginLeft: '15px' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <p>
                    Connect to your wallets and save them to receive donations on your Wallet Tree Page.
                </p>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Ads2 />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CreatePageInput username={username} setUsername={setUsername} handleDashboardChange={handleDashboardChange} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Ads1 />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <MyWallets />   
                </Grid>

                <Grid item xs={12} md={6}>
                    <MyProfilePages />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Transactions />
                </Grid>
                 */}
            </Grid>
        </Container>
    );
};
