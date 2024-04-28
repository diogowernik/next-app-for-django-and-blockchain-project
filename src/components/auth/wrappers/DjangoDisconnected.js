import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário não está conectado ao Django
export const DjangoDisconnected = ({ children }) => {
    const { djangoIsAuthenticated } = useAuth();
    return !djangoIsAuthenticated ? <>{children}</> : null;
};
