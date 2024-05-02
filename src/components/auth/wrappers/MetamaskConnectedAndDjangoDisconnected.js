import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário está conectado ao MetaMask e desconectado do Django
export const MetamaskConnectedAndDjangoDisconnected = ({ children }) => {
    const { metamaskIsAuthenticated, djangoIsAuthenticated } = useAuth();

    // Renderiza children apenas se o MetaMask estiver autenticado e o Django não estiver
    if (metamaskIsAuthenticated && !djangoIsAuthenticated) {
        return <>{children}</>;
    } else {
        // Pode escolher renderizar algo específico aqui se não estiver na condição desejada, como uma mensagem ou redirecionamento
        return null;
    }
};
