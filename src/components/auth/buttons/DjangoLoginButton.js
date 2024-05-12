import React from 'react';
import { useMetamaskSignatureForDjangoLogin } from '@/hooks';

export const DjangoLoginButton = () => {
    const loginWithDjangoUsingMetamask = useMetamaskSignatureForDjangoLogin();

    return <button onClick={loginWithDjangoUsingMetamask}>Login with Django via MetaMask</button>;
};

