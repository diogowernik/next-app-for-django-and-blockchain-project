// @hooks/metamask/useMetamaskUpdateStatus
import { metamaskManager } from '@/services/wallets'; 

export const useMetamaskUpdateStatus = (setBalance, setChainId, setLoading) => {
    const metamaskUpdateStatus = async () => {
        setLoading(true);
        try {
            const balance = await metamaskManager.getBalance();
            setBalance(balance);
            setChainId(metamaskManager.chainId);
            console.log('Updated balance and chain ID: ', { balance, chainId: metamaskManager.chainId });
        } catch (error) {
            console.log('Failed to update balance or chain ID.', { variant: 'error' });
        }
    };

    return metamaskUpdateStatus;
};
