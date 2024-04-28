import React, { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const MetamaskDjangoIntegratedLogin = () => {
    const { integratedMetamaskDjangoLogin, djangoLoading } = useContext(AuthContext);

    const handleLogin = () => {
        integratedMetamaskDjangoLogin();
    };

    return (
        <button onClick={handleLogin} disabled={djangoLoading}>
            {djangoLoading ? 'Connecting...' : 'Login with MetaMask and Django'}
        </button>
    );
};

export default MetamaskDjangoIntegratedLogin;
