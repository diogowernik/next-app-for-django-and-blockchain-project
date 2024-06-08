import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

// Django hooks
import { useDjangoSignIn, useDjangoRegister, useDjangoSignOut } from '@/hooks';

const DjangoAuthContext = createContext();

export const DjangoAuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Django authentication states
  const [djangoToken, setDjangoToken] = useState(null);
  const [isDjangoAuthenticated, setIsDjangoAuthenticated] = useState(false);

  // Check if the user is already authenticated in Django
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setDjangoToken(tokenFromStorage);
      setIsDjangoAuthenticated(true);
    }
  }, []);

  // Django hooks
  const djangoSignIn = useDjangoSignIn(setDjangoToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoRegister = useDjangoRegister(setDjangoToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoSignOut = useDjangoSignOut(setDjangoToken, setIsDjangoAuthenticated, enqueueSnackbar); 

  const value = {
    djangoToken,
    isDjangoAuthenticated,
    djangoLoading: loading,
    djangoSignIn,
    djangoRegister,
    djangoSignOut,
  };

  return <DjangoAuthContext.Provider value={value}>{children}</DjangoAuthContext.Provider>;
};

export const useDjangoAuth = () => useContext(DjangoAuthContext);
