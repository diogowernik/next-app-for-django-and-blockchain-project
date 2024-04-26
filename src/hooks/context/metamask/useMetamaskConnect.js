// @hooks/metamask/useMetamaskConnect
import { metamaskManager } from '@/services/wallet';  // Corrigir o caminho conforme o necessário

export const useMetamaskConnect = (setIsAuthenticated, setUserAddress, enqueueSnackbar) => {
    const metamaskConnect = async () => {
        console.log("Chamando metamaskConnect...");

        if (!metamaskManager) {
            console.error("metamaskManager está indefinido.");
            return;
        }

        try {
            const address = await metamaskManager.connect();
            if (address) {
                localStorage.setItem('userAddress', address);
                setIsAuthenticated(true);
                setUserAddress(address);
                enqueueSnackbar('Connected with MetaMask successfully!', { variant: 'success' });
                console.log("Usuário conectado com endereço:", address);
            }
        } catch (error) {
            console.error("Falha ao conectar com MetaMask:", error);
            enqueueSnackbar(error.message || 'Failed to connect with MetaMask.', { variant: 'error' });
        }
    };

    return metamaskConnect;
};
