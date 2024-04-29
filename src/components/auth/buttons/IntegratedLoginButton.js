import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMetamaskSignatureForDjangoLogin } from '@/hooks';

const IntegratedLoginButton = () => {
    const { metamaskConnect, metamaskIsAuthenticated } = useAuth();
    const loginWithDjangoUsingMetamask = useMetamaskSignatureForDjangoLogin();

    const handleConnectAndLogin = useCallback(async () => {
        if (!metamaskIsAuthenticated) {
            await metamaskConnect();
        } 
    }, [metamaskConnect, metamaskIsAuthenticated, loginWithDjangoUsingMetamask]);

    const loginWithDjango = useCallback(async () => {
        setTimeout(async () => {
            await loginWithDjangoUsingMetamask();
        }, 500); // Delay para garantir que a conexão foi processada e o endereço atualizado no contexto
    }, [loginWithDjangoUsingMetamask]);

    useEffect(() => {
        if (metamaskIsAuthenticated) {
            loginWithDjango();
        }
    }, [metamaskIsAuthenticated]);

    return <button onClick={handleConnectAndLogin}>Conectar com MetaMask e Login com Django</button>;
};

export default IntegratedLoginButton;
