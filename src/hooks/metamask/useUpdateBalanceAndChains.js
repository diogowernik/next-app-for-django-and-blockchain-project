// @hooks/metamask/useUpdateBalanceAndChains

import MetamaskAuth from '@/api/MetamaskAuth';

export const useUpdateBalanceAndChain = (setBalance, setChainId, userAddress) => {
    const metamaskManager = new MetamaskAuth();

    return useCallback(async () => {
        if (userAddress) {
            const balance = await metamaskManager.getBalance(userAddress);
            setBalance(balance);
            setChainId(metamaskManager.chainId);
        }
    }, [userAddress, setBalance, setChainId]);
};
