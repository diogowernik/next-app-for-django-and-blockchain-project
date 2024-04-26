// @hooks/metamask/useMetamaskSignOut

export const useMetamaskSignOut = (setIsAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar) => {
    const metamaskSignOut = () => {
        localStorage.removeItem('userAddress');
        setIsAuthenticated(false);
        setUserAddress(null);
        setBalance("0");
        setChainId(null);
        enqueueSnackbar('Signed out successfully.', { variant: 'info' });
    };

    return metamaskSignOut;
};
