import React from 'react';
import { Box, Avatar, Typography, TextField, Button, styled } from '@mui/material';

const CryptoItem = styled('div')(({ theme }) => ({
    width: '100%', // Uso total da largura disponível
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1, 0),
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    '&:hover': {
        boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
    },
}));

export const CryptosView = ({ crypto, amount, onAmountChange }) => {
    return (
        <CryptoItem>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Avatar src={crypto.icon} alt={crypto.name} sx={{ marginRight: 1, width: 40, height: 40 }} />
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {crypto.name}
                </Typography>
            </Box>
            <Box>
                <TextField
                    size="small"
                    type="number"
                    value={amount}
                    onChange={e => onAmountChange(e.target.value)}
                    sx={{ width: '160px', marginRight: 2 }}
                    placeholder='Send amount'
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log(`Sending ${amount || 0} ${crypto.name} to ${crypto.blockchain} via contract ${crypto.transferContract}`)}
                >
                    Send
                </Button>
            </Box>
        </CryptoItem>
    );
};
