// @hooks/django/useDjangoSignOut

export const useDjangoSignOut = (setToken, setIsAuthenticated, enqueueSnackbar) => {
    const performDjangoSignOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        enqueueSnackbar('You have been successfully signed out.', { variant: 'success' });
    };

    return performDjangoSignOut;
};
