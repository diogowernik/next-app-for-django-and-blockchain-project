// src/hooks/useRequestSignature.js

import { useWalletManager } from '@/context/MetamaskContext';

export const useRequestSignature = () => {
    const { metamaskUserAddress } = useWalletManager();

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
