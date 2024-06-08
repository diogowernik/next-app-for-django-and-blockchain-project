import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { walletConfig } from '@/config/WalletConfig';
import Button from '@mui/material/Button';

export const DjangoLoginButton = ({ walletName }) => {
    const { requestSignature, userAddress } = useWallet(walletName);

    const loginWithDjango = async () => {
        const message = "Please sign this message to confirm your identity.";
        const signature = await requestSignature(message);
        if (!signature) return;

        // Lógica para fazer login no Django com a assinatura
        // await djangoLogin(userAddress, signature);
    };

    return (
        <Button variant="contained" color="primary" onClick={loginWithDjango}>
            Login with Django via {walletConfig[walletName].name}
        </Button>
    );
};
