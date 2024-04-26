// @hooks/django/useDjangoMetamaskRegister

import { djangoMetamaskRegister as registerMetamaskApi } from '@/api/django_auth';

export const useDjangoMetamaskRegister = (setLoading, enqueueSnackbar) => {
    const djangoRegister = async (address, signature) => {
        setLoading(true);
        try {
            const response = await registerMetamaskApi(address, signature);
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

    return djangoRegister;
};
