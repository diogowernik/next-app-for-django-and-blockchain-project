import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/hooks/useWallet';

export const DjangoAndWalletConnected = ({ walletName, children }) => {
    const { isAuthenticated: djangoIsAuthenticated } = useAuth();
    const { isAuthenticated: walletIsAuthenticated } = useWallet(walletName);

    if (walletIsAuthenticated && djangoIsAuthenticated) {
        return <>{children}</>;
    } else {
        // Pode escolher renderizar algo específico aqui se não estiver conectado, como uma mensagem ou redirecionamento
        return null;
    }
};
