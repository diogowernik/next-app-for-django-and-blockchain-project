import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import { useMetamaskDjangoLogin } from '@/hooks';

const MetaDjangoIntegratedLogin = () => {
    const { metamaskConnect, metamaskIsAuthenticated } = useWalletManager();
    const loginWithDjangoUsingMetamask = useMetamaskDjangoLogin();

    const handleConnection = async () => {
        if (!metamaskIsAuthenticated) {
            const success = await metamaskConnect(); // Assume que esta função retorna true se a conexão for bem-sucedida
            if (success) {
                await loginWithDjangoUsingMetamask(); // Tentar fazer login no Django imediatamente após a conexão
            }
        } else {
            await loginWithDjangoUsingMetamask(); // Se já estiver autenticado, tenta fazer login no Django
        }
    };

    return (
        <button onClick={handleConnection}>
            Conectar ao MetaMask e ao Django via MetaMask
        </button>
    );
};

export default MetaDjangoIntegratedLogin;
