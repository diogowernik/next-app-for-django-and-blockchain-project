import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';

const MetaMaskConnectButton = () => {
    const { metamaskConnect } = useWalletManager();

    return <button onClick={metamaskConnect}>Conectar com MetaMask</button>;
};

export default MetaMaskConnectButton;
