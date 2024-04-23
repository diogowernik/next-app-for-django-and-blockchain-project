// src/hooks/useDjangoAuth.js
import { useContext } from 'react';
import DjangoAuthContext from '@/context/DjangoContext';

export const useDjangoAuth = () => {
    const context = useContext(DjangoAuthContext);
    if (!context) throw new Error('useDjangoAuth must be used within a DjangoProvider');
    return context;
};
