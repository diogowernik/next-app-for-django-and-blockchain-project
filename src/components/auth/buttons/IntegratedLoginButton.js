import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMetamaskSignatureForDjangoLogin } from '@/hooks';

const IntegratedLoginButton = () => {
    const { 
        metamaskConnect, 
        metamaskIsAuthenticated,
        djangoIsAuthenticated,  // Certifique-se de que este estado está sendo atualizado corretamente no contexto
    } = useAuth();
    const loginWithDjangoUsingMetamask = useMetamaskSignatureForDjangoLogin();

    const handleConnectAndLogin = useCallback(async () => {
        if (!metamaskIsAuthenticated) {
            await metamaskConnect();
        } 
    }, [metamaskConnect, metamaskIsAuthenticated]);

    const loginWithDjango = useCallback(async () => {
        await loginWithDjangoUsingMetamask();
    }, [loginWithDjangoUsingMetamask]);
    

    useEffect(() => {
        if (metamaskIsAuthenticated && !djangoIsAuthenticated) {
            loginWithDjango();
        }
    }, [metamaskIsAuthenticated, djangoIsAuthenticated]);  // Removido loginWithDjango das dependências para evitar rechamadas desnecessárias
    

    return ( 
        <button onClick={handleConnectAndLogin}>Conectar</button>
    );
};

export default IntegratedLoginButton;
