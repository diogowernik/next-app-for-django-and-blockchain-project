import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';

export const MyWallets = () => {
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
            <CardActions>
                <Button size="small">Connect Wallet</Button>
            </CardActions>
        </Card>

    );
};
