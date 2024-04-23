// @hooks/metamask/useConnectWithMetamask
import WalletManager from '@/services/wallet/WalletManager';

export const useConnectWithMetamask = (setIsAuthenticated, setUserAddress, updateBalanceAndChain, enqueueSnackbar) => {
    const metamaskManager = new WalletManager();

    const connectWithMetamask = async () => {
        try {
            const address = await metamaskManager.connect();
            if (address) {
                localStorage.setItem('userAddress', address);
                setIsAuthenticated(true);
                setUserAddress(address);
                await updateBalanceAndChain(metamaskManager);
                enqueueSnackbar('Connected with MetaMask successfully!', { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar(error.message || 'Failed to connect with MetaMask.', { variant: 'error' });
        }
    };

    return connectWithMetamask;
};
