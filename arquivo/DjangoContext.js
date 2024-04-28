// @/context/DjangoContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDjangoSignIn, useDjangoRegister, useDjangoSignOut, useDjangoMetamaskLogin, useDjangoMetamaskRegister } from '@/hooks';  

const DjangoContext = createContext();

export const DjangoProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isDjangoAuthenticated, setIsDjangoAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setIsDjangoAuthenticated(true); 
    }
  }, []);

  const djangoSignIn = useDjangoSignIn(setToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoRegister = useDjangoRegister(setToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoSignOut = useDjangoSignOut(setToken, setIsDjangoAuthenticated, enqueueSnackbar); 
  const djangoMetamaskLogin = useDjangoMetamaskLogin(setToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoMetamaskRegister = useDjangoMetamaskRegister(setLoading, enqueueSnackbar); 

  const value = {
    djangoToken: token,
    djangoIsAuthenticated: isDjangoAuthenticated,
    djangoLoading: loading,
    djangoSignIn,
    djangoSignOut,
    djangoRegister,
    djangoMetamaskLogin,
    djangoMetamaskRegister,
  };

  return <DjangoContext.Provider value={value}>{children}</DjangoContext.Provider>;
};

export default DjangoContext;
