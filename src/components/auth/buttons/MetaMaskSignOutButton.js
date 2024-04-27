import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';

const MetaMaskSignOutButton = () => {
    const { metamaskSignOut } = useWalletManager();

    return <button onClick={metamaskSignOut}>Desconectar MetaMask</button>;
};

export default MetaMaskSignOutButton;
