// @hooks/useSignOut

export const useSignOut = (setToken, setIsAuthenticated, enqueueSnackbar) => {
    const signOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        enqueueSnackbar('You have been successfully signed out.', { variant: 'success' });
    };

    return signOut;
};
