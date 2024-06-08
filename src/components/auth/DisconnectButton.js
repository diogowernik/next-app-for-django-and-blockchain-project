import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { walletConfig } from '@/config/WalletConfig';
import Button from '@mui/material/Button';

export const DisconnectButton = ({ walletName }) => {
    const { updateAuthState } = useAuth();

    const handleDisconnect = () => {
        updateAuthState(walletName, {
            isAuthenticated: false,
            userAddress: null,
        });
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleDisconnect}>
            Desconectar {walletConfig[walletName].name}
        </Button>
    );
};
