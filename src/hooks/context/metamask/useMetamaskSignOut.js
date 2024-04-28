// @hooks/metamask/useMetamaskSignOut

export const useMetamaskSignOut = (setIsMetamaskAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar) => {
    const metamaskSignOut = () => {
        localStorage.removeItem('userAddress');
        setIsMetamaskAuthenticated(false);
        setUserAddress(null);
        setBalance("0");
        setChainId(null);
        enqueueSnackbar('Signed out successfully.', { variant: 'info' });
    };

    return metamaskSignOut;
};
