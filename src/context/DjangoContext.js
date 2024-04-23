// @/context/DjangoContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSignIn, useRegister, useSignOut, useLoginWithMetamask, useRegisterWithMetamask } from '@/hooks';  
     
const DjangoContext = createContext();

export const DjangoProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setIsAuthenticated(true); 
    }
  }, []);

  const signIn = useSignIn(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); 
  const register = useRegister(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); 
  const loginWithMetamask = useLoginWithMetamask(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); 
  const registerWithMetamask = useRegisterWithMetamask(setLoading, enqueueSnackbar); 
  const signOut = useSignOut(setToken, setIsAuthenticated, enqueueSnackbar); 

  const value = {
    djangoToken: token,
    djangoIsAuthenticated: isAuthenticated,
    djangoLoading: loading,
    djangoSignIn: signIn,
    djangoSignOut: signOut,
    djangoRegister: register,
    djangoLoginWithMetamask: loginWithMetamask,
    djangoRegisterWithMetamask: registerWithMetamask,
};


  return <DjangoContext.Provider value={value}>{children}</DjangoContext.Provider>;
};

export default DjangoContext;
