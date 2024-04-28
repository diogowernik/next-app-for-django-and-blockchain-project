// @hooks/django/useDjangoSignOut

export const useDjangoSignOut = (setToken, setIsDjangoAuthenticated, enqueueSnackbar) => {
    const performDjangoSignOut = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsDjangoAuthenticated(false);
        enqueueSnackbar('You have been successfully signed out.', { variant: 'success' });
    };

    return performDjangoSignOut;
};
