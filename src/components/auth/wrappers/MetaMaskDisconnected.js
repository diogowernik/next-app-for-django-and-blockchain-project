import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';

// Componente que renderiza conteúdo apenas quando o usuário não está conectado ao MetaMask
export const MetaMaskDisconnected = ({ children }) => {
    const { metamaskIsAuthenticated } = useWalletManager();
    return !metamaskIsAuthenticated ? <>{children}</> : null;
};
