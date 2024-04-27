import React from 'react';
import { useDjangoAuth } from '@/hooks';

// Componente que renderiza conteúdo apenas quando o usuário está conectado ao Django
export const DjangoConnected = ({ children }) => {
    const { djangoIsAuthenticated } = useDjangoAuth();
    return djangoIsAuthenticated ? <>{children}</> : null;
};

