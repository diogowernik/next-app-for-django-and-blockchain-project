import { useCallback } from 'react';
import { useWeb3 } from './useWeb3';

export const useMetamaskConnect = (setIsMetamaskAuthenticated, setUserAddress, enqueueSnackbar) => {
    const web3 = useWeb3();

    const metamaskConnect = useCallback(async () => {
        console.log("Chamando metamaskConnect...");

        if (!web3) {
            console.error("Web3 não está inicializado.");
            return;
        }

        try {
            const accounts = await web3.eth.requestAccounts();
            const address = accounts.length > 0 ? accounts[0] : null;
            if (address) {
                localStorage.setItem('userAddress', address);
                setIsMetamaskAuthenticated(true);
                setUserAddress(address);
                enqueueSnackbar('Connected with MetaMask successfully!', { variant: 'success' });
                console.log("Usuário conectado com endereço:", address);
            }
        } catch (error) {
            console.error("Falha ao conectar com MetaMask:", error);
            enqueueSnackbar(error.message || 'Failed to connect with MetaMask.', { variant: 'error' });
        }
    }, [web3, setIsMetamaskAuthenticated, setUserAddress, enqueueSnackbar]);

    return metamaskConnect;
};
