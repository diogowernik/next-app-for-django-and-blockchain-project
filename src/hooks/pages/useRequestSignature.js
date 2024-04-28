// src/hooks/useRequestSignature.js

import { useAuth } from '@/context/AuthContext';

export const useRequestSignature = () => {
    const { metamaskUserAddress } = useAuth();

    const requestSignature = async (message) => {
        try {
            return await window.ethereum.request({
                method: 'personal_sign',
                params: [message, metamaskUserAddress],
            });
        } catch (error) {
            console.error("Error obtaining signature:", error);
            return null;
        }
    };

    return requestSignature;
};
