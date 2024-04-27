import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';

// Componente que renderiza conteúdo apenas quando o usuário está conectado ao MetaMask
export const MetaMaskConnected = ({ children }) => {
    const { metamaskIsAuthenticated } = useWalletManager();
    return metamaskIsAuthenticated ? <>{children}</> : null;
};
