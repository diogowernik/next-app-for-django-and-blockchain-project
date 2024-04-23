// @hooks/django/useRegister

import { register as registerApi } from '@/api/django_auth';

export const useRegister = (setToken, setIsAuthenticated, setLoading, enqueueSnackbar) => {
    const register = async (username, password, callback) => {
        setLoading(true);
        try {
            const response = await registerApi(username, password);
            if (response && response.id) {
                // Assumindo que a API retorna um token após o registro, caso contrário ajuste conforme necessário
                localStorage.setItem('token', response.token);
                setToken(response.token);
                setIsAuthenticated(true);
                enqueueSnackbar('Registration successful! Please log in.', { variant: 'success' });
                if (callback) callback();
            } else {
                enqueueSnackbar('Registration failed.', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar(error.message || 'An error occurred.', { variant: 'error' });
        }
        setLoading(false);
    };

    return register;
};
