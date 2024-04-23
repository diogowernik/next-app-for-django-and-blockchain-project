// @hooks/useLoginWithMetamask

import { loginWithMetamask as loginMetamaskApi } from '@/api/DjangoAuth';

export const useLoginWithMetamask = (setToken, setIsAuthenticated, setLoading, enqueueSnackbar) => {
    const loginWithMetamask = async (ethereumAddress, signature, callback) => {
        setLoading(true);
        try {
            const response = await loginMetamaskApi(ethereumAddress, signature);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                setToken(response.token);
                setIsAuthenticated(true);
                enqueueSnackbar('Login with MetaMask successful!', { variant: 'success' });
                if (callback) callback();
            } else {
                enqueueSnackbar('MetaMask login failed.', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar(error.message || 'An error occurred during MetaMask login.', { variant: 'error' });
        }
        setLoading(false);
    };

    return loginWithMetamask;
};
