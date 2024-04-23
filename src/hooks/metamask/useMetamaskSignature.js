import { useContext } from 'react';
import { useMetamaskAuth } from '@/context/MetamaskContext';

export const useMetaMaskSignature = () => {
    const { userAddress } = useMetamaskAuth();

    const requestSignature = async (message) => {
        try {
            return await window.ethereum.request({
                method: 'personal_sign',
                params: [message, userAddress],
            });
        } catch (error) {
            console.error("Error obtaining signature:", error);
            return null;
        }
    };

    return { requestSignature, userAddress };
};
