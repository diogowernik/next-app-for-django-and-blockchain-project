// @hooks/django/useDjangoMetamaskLogin

import { djangoMetamaskLogin } from '@/api/djangoAuth';

export const useDjangoMetamaskLogin = (setToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar) => {
    const performDjangoMetamaskLogin = async (ethereumAddress, signature, callback) => {
        setLoading(true);
        try {
            const response = await djangoMetamaskLogin(ethereumAddress, signature);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                setToken(response.token);
                setIsDjangoAuthenticated(true);
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

    return performDjangoMetamaskLogin;
};
