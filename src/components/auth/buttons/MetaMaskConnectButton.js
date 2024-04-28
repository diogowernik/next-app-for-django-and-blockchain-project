import React from 'react';
import { useAuth } from '@/context/AuthContext';

const MetaMaskConnectButton = () => {
    const { metamaskConnect } = useAuth();

    return <button onClick={metamaskConnect}>Conectar com MetaMask</button>;
};

export default MetaMaskConnectButton;
