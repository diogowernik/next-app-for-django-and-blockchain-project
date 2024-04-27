import React from 'react';
import { useDjangoAuth } from '@/hooks';

// Componente que renderiza conteúdo apenas quando o usuário não está conectado ao Django
export const DjangoDisconnected = ({ children }) => {
    const { djangoIsAuthenticated } = useDjangoAuth();
    return !djangoIsAuthenticated ? <>{children}</> : null;
};
