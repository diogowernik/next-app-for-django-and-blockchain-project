// @hooks/metamask/useSignOutWithMetamask

export const useSignOutMetamask = (setUserAddress, setIsAuthenticated, setBalance, setChainId) => {
    return useCallback(() => {
        localStorage.removeItem('userAddress');
        setIsAuthenticated(false);
        setUserAddress(null);
        setBalance("0");
        setChainId(null);
    }, [setUserAddress, setIsAuthenticated, setBalance, setChainId]);
};
