// @hooks/metamask/useSignOut

export const useSignOut = (setIsAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar) => {
    const signOut = () => {
        localStorage.removeItem('userAddress');
        setIsAuthenticated(false);
        setUserAddress(null);
        setBalance("0");
        setChainId(null);
        enqueueSnackbar('Signed out successfully.', { variant: 'info' });
    };

    return signOut;
};
