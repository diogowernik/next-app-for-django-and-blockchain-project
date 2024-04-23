// src/hooks/useMetamaskDjangoRegister.js
import { useDjangoAuth } from '@/hooks';
import { useRequestSignature } from './useRequestSignature';
import { useWalletManager } from '@/context/MetamaskContext';

export const useMetamaskDjangoRegister = () => {
    const { djangoRegisterWithMetamask } = useDjangoAuth();
    const { metamaskIsAuthenticated, metamaskUserAddress } = useWalletManager();
    const requestSignature = useRequestSignature();

    const register = async () => {
        if (!metamaskIsAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your registration.";
        const signature = await requestSignature(message);
        if (!signature) return;

        const result = await djangoRegisterWithMetamask(metamaskUserAddress, signature);
        if (result) {
            console.log("Registration response:", result.message);
        } else {
            console.log("Registration failed with no response from server");
        }
    };

    return register;
};

