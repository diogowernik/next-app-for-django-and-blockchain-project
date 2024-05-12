// src/hooks/useMetamaskSignatureForDjangoRegister.js
import { useRequestSignature } from './useRequestSignature';
import { useAuth } from '@/context/AuthContext';

export const useMetamaskSignatureForDjangoRegister = () => {
    const { djangoRegisterWithMetamask } = useAuth();
    const { metamaskIsAuthenticated, metamaskUserAddress } = useAuth();
    const requestSignature = useRequestSignature();

    const register = async () => {
        if (!metamaskIsAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your identity.";
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

