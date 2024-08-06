import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';

export const MyProfilePages = () => {
    return (
        <Card>
            <CardHeader
                title="My Profile Pages"
            />
            <CardContent>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        See your Profile Page Here
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small">Connect Wallet</Button>
            </CardActions>
        </Card>

    );
};
