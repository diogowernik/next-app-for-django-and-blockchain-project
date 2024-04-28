import React from 'react';
import { useAuth } from '@/context/AuthContext';

// Componente que renderiza conteúdo apenas quando o usuário está conectado ao Django
export const DjangoConnected = ({ children }) => {
    const { djangoIsAuthenticated } = useAuth();
    return djangoIsAuthenticated ? <>{children}</> : null;
};

