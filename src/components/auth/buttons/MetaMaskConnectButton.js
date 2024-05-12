import React from 'react';
import { useAuth } from '@/context/AuthContext';

export const MetaMaskConnectButton = () => {
    const { metamaskConnect } = useAuth();

    return <button onClick={metamaskConnect}>Conectar com MetaMask</button>;
};

