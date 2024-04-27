import React from 'react';
import { useMetamaskDjangoLogin } from '@/hooks';

const DjangoLoginButton = () => {
    const loginWithDjangoUsingMetamask = useMetamaskDjangoLogin();

    return <button onClick={loginWithDjangoUsingMetamask}>Login with Django via MetaMask</button>;
};

export default DjangoLoginButton;
