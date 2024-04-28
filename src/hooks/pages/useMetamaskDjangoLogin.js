// src/hooks/useMetamaskDjangoLogin.js
import { useRequestSignature } from './useRequestSignature';
import { useAuth } from '@/context/AuthContext';

export const useMetamaskDjangoLogin = () => {
    const { djangoMetamaskLogin } = useAuth();
    const { metamaskIsAuthenticated, metamaskUserAddress } = useAuth();
    const requestSignature = useRequestSignature();

    const login = async () => {
        if (!metamaskIsAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your identity.";
        const signature = await requestSignature(message);
        if (!signature) return;

        await djangoMetamaskLogin(metamaskUserAddress, signature);
    };

    return login;
};
