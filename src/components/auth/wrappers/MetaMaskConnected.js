// @components/auth/wrappers/MetaMaskConnected.js

import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário está conectado ao MetaMask
export const MetaMaskConnected = ({ children }) => {
    const { metamaskIsAuthenticated } = useAuth();
    return metamaskIsAuthenticated ? <>{children}</> : null;
};
