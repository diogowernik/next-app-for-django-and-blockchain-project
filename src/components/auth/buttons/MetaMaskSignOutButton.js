import React from 'react';
import { useAuth } from '@/context/AuthContext';

const MetaMaskSignOutButton = () => {
    const { metamaskSignOut } = useAuth();

    return <button onClick={metamaskSignOut}>Desconectar MetaMask</button>;
};

export default MetaMaskSignOutButton;
