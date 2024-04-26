// src/hooks/useMetamaskDjangoLogin.js
import { useDjangoAuth } from '@/hooks';
import { useRequestSignature } from './useRequestSignature';
import { useWalletManager } from '@/context/MetamaskContext';

export const useMetamaskDjangoLogin = () => {
    const { djangoMetamaskLogin } = useDjangoAuth();
    const { metamaskIsAuthenticated, metamaskUserAddress } = useWalletManager();
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
