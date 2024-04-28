import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário não está conectado ao MetaMask
export const MetaMaskDisconnected = ({ children }) => {
    const { metamaskIsAuthenticated } = useAuth();
    return !metamaskIsAuthenticated ? <>{children}</> : null;
};
