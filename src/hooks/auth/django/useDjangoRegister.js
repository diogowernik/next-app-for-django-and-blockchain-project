// @hooks/django/useDjangoRegister

import { djangoRegister } from '@/api/djangoAuth';  // Importe a API de registro

export const useDjangoRegister = (setLoading, enqueueSnackbar) => {
    const performDjangoRegister = async (address, signature) => {
        setLoading(true);
        try {
            const response = await djangoRegister(address, signature);
            console.log("Response from registration:", response);  // Logar a resposta completa

            if (response && response.message === 'User created successfully.') {
                enqueueSnackbar('Registration via MetaMask successful!', { variant: 'success' });
            } else {
                enqueueSnackbar('Registration via MetaMask failed.', { variant: 'error' });
            }
            return response;
        } catch (error) {
            enqueueSnackbar(error.message || 'An error occurred.', { variant: 'error' });
            console.error('Error in registration:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return performDjangoRegister;
};
