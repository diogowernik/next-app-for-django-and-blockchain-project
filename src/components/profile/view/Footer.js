import React from 'react';
import { Box, useTheme } from '@mui/material';

export const Footer = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            width: '100%',
            height: '50px',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default, // use theme for background color
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: `1px solid ${theme.palette.divider}`, // use theme for border color
            borderRadius: '0 0 20px 20px' // Arredonda apenas as bordas inferiores
        }}>
            <img src={'/logo.png'} alt='Wtree Logo' style={{ width: '100px', marginLeft: '10px' }} />
            <p style={{ fontSize: '0.8em', marginRight: '30px' }}>
                @WalleTree 2024 - All rights reserved
            </p>
        </Box>
    );
};
