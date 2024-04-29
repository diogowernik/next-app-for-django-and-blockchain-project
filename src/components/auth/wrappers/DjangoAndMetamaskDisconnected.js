import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário não está conectado nem ao MetaMask nem ao Django
export const DjangoAndMetamaskDisconnected = ({ children }) => {
    const { metamaskIsAuthenticated, djangoIsAuthenticated } = useAuth();

    // Verifica se o usuário não está autenticado em ambos os serviços
    if (!metamaskIsAuthenticated && !djangoIsAuthenticated) {
        return <>{children}</>;
    } else {
        // Se estiver conectado a qualquer um dos serviços, não renderiza as children
        return null;
    }
};
