import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário está conectado ao MetaMask e ao Django
export const DjangoAndMetamaskConnected = ({ children }) => {
    const { metamaskIsAuthenticated, djangoIsAuthenticated } = useAuth();

    // Renderiza children apenas se ambos os estados de autenticação forem verdadeiros
    if (metamaskIsAuthenticated && djangoIsAuthenticated) {
        return <>{children}</>;
    } else {
        // Pode escolher renderizar algo específico aqui se não estiver conectado, como uma mensagem ou redirecionamento
        return null;
    }
};
