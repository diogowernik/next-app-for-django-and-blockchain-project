import React from 'react';
import { useAuth } from '@/context/AuthContext';

export const MetaMaskSignOutButton = () => {
    const { metamaskSignOut } = useAuth();

    return <button onClick={metamaskSignOut}>Desconectar MetaMask</button>;
};

