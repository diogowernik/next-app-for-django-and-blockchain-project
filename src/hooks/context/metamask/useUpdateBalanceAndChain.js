// @hooks/metamask/useUpdateBalanceAndChain
import WalletManager from '@/services/wallet/WalletManager';

export const useUpdateBalanceAndChain = (setBalance, setChainId, enqueueSnackbar, setLoading) => {
    const metamaskManager = new WalletManager();

    const updateBalanceAndChain = async () => {
        setLoading(true);
        try {
            const balance = await metamaskManager.getBalance();
            setBalance(balance);
            setChainId(metamaskManager.chainId);
            enqueueSnackbar('Balance and chain ID updated successfully!', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to update balance or chain ID.', { variant: 'error' });
        }
    };

    return updateBalanceAndChain;
};
