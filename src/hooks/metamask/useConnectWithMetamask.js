// @hooks/metamask/useConnectWithMetamask

export const useConnectWithMetamask = (setUserAddress, setIsAuthenticated, updateBalanceAndChain) => {
    const metamaskManager = new MetamaskAuth();

    return useCallback(async () => {
        const address = await metamaskManager.connect();
        if (address) {
            localStorage.setItem('userAddress', address);
            setIsAuthenticated(true);
            setUserAddress(address);
            updateBalanceAndChain();
        }
    }, [metamaskManager, setUserAddress, setIsAuthenticated, updateBalanceAndChain]);
};
