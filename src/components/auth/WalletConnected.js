import React from 'react';
import { useWallet } from '@/hooks/useWallet';

export const WalletConnected = ({ walletName, children }) => {
    const { isAuthenticated } = useWallet(walletName);
    return isAuthenticated ? <>{children}</> : null;
};
