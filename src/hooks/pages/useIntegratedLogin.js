// src/hooks/useIntegratedLogin.js
import { useSnackbar } from 'notistack';
import { useAuth } from '@/context/AuthContext';
import { useMetamaskDjangoLogin } from './useMetamaskDjangoLogin';

export const useIntegratedLogin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { metamaskConnect, metamaskIsAuthenticated } = useAuth();
    const loginWithDjangoUsingMetamask = useMetamaskDjangoLogin();

    const integratedLogin = async () => {
        if (!metamaskIsAuthenticated) {
            console.log("Connecting MetaMask wallet...");
            enqueueSnackbar('Connecting to MetaMask...', { variant: 'info' });
            await metamaskConnect();
        }

        if (!metamaskIsAuthenticated) {
            enqueueSnackbar('Failed to connect MetaMask.', { variant: 'error' });
            console.error("Failed to connect MetaMask.");
            return;
        }

        console.log("Proceeding to login with Django using MetaMask...");
        enqueueSnackbar('Proceeding to login with Django...', { variant: 'info' });
        await loginWithDjangoUsingMetamask();
    };

    return integratedLogin;
};
