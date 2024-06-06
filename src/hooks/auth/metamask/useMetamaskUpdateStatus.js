import { useCallback } from 'react';
import { useWeb3 } from './useWeb3';

export const useMetamaskUpdateStatus = (setBalance, setChainId, setLoading) => {
    const web3 = useWeb3();

    const metamaskUpdateStatus = useCallback(async () => {
        setLoading(true);
        try {
            const userAddress = localStorage.getItem('userAddress');
            if (userAddress && web3) {
                const balance = await web3.eth.getBalance(userAddress);
                const formattedBalance = web3.utils.fromWei(balance, 'ether');
                const chainId = await web3.eth.getChainId();

                setBalance(formattedBalance);
                setChainId(chainId);
                console.log('Updated balance and chain ID: ', { balance: formattedBalance, chainId });
            }
        } catch (error) {
            console.error('Failed to update balance or chain ID.', error);
        } finally {
            setLoading(false);
        }
    }, [web3, setBalance, setChainId, setLoading]);

    return metamaskUpdateStatus;
};
