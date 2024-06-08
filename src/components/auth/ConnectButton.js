import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { walletConfig } from '@/config/WalletConfig';
import Button from '@mui/material/Button';

export const ConnectButton = ({ walletName, network }) => {
    const { connect } = useWallet(walletName);

    return (
        <Button variant="contained" color="primary" onClick={() => connect(network)}>
            Conectar com {walletConfig[walletName].name}
        </Button>
    );
};
