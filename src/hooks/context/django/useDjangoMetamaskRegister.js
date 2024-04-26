// @hooks/django/useDjangoMetamaskRegister

import { djangoMetamaskRegister } from '@/api/django_auth';

export const useDjangoMetamaskRegister = (setLoading, enqueueSnackbar) => {
    const performDjangoMetamaskRegister = async (address, signature) => {
        setLoading(true);
        try {
            const response = await djangoMetamaskRegister(address, signature);
            console.log("Response from registerWithMetamask:", response);  // Logar a resposta completa

            if (response && response.message === 'User created successfully.') {
                enqueueSnackbar('Registration via MetaMask successful!', { variant: 'success' });
            } else {
                enqueueSnackbar('Registration via MetaMask failed.', { variant: 'error' });
            }
            return response;
        } catch (error) {
            enqueueSnackbar(error.message || 'An error occurred during MetaMask registration.', { variant: 'error' });
            console.error('Error in registration:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return performDjangoMetamaskRegister;
};
