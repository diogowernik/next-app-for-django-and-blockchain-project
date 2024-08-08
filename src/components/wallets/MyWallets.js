import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';

export const MyWallets = ({handleDashboardChange}) => {
    const handleSubmit = () => {
        handleDashboardChange('wallets');
    };
    return (
        <Card>
            <CardHeader
                title="My Wallets"
            />
            <CardContent>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        See your connected wallets here!
                    </Typography>
                </Box>
            </CardContent>
            <CardActions
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '10px', width: '180px' }}
                >
                    My Profiles Pages
                </Button>
            </CardActions>
        </Card>

    );
};
