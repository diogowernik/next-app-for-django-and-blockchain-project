// @hooks/useSignIn

import { signIn as signInApi } from '@/api/DjangoAuth';  // Importe a API de login

export const useSignIn = (setToken, setIsAuthenticated, setLoading, enqueueSnackbar) => {
    const signIn = async (username, password, callback) => {
        setLoading(true);
        try {
            const response = await signInApi(username, password);
            if (response && response.auth_token) {
                localStorage.setItem('token', response.auth_token);
                setToken(response.auth_token);
                setIsAuthenticated(true);
                enqueueSnackbar('Login successful!', { variant: 'success' });
                if (callback) callback();
            } else {
                enqueueSnackbar('Login failed.', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar(error.message || 'An error occurred.', { variant: 'error' });
        }
        setLoading(false);
    };

    return signIn;
};
