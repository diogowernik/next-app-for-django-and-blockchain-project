// @hooks/django/useDjangoSignIn

import { djangoSignIn } from '@/api/djangoAuth';  // Importe a API de login

export const useDjangoSignIn = (setToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar) => {
    const performDjangoSignIn = async (username, password, callback) => {
        setLoading(true);
        try {
            const response = await djangoSignIn(username, password);
            if (response && response.auth_token) {
                localStorage.setItem('token', response.auth_token);
                setToken(response.auth_token);
                setIsDjangoAuthenticated(true);
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

    return performDjangoSignIn;
};
