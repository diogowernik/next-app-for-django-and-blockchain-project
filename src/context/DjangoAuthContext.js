// @/context/DjangoAuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSignIn, useRegister, useSignOut, useLoginWithMetamask, useRegisterWithMetamask } from '@/hooks';  
     
const DjangoAuthContext = createContext();

export const DjangoAuthProvider = ({ children }) => {
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

  // register sign in with username and password on Django
  const signIn = useSignIn(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); // Passando funções e estados como argumentos
  const register = useRegister(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); // Usando o hook useRegister
  // login and register with metamask on Django
  const loginWithMetamask = useLoginWithMetamask(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); // Usando o hook useLoginWithMetamask
  const registerWithMetamask = useRegisterWithMetamask(setLoading, enqueueSnackbar); // Usando o hook useRegisterWithMetamask
  // sign out of Django
  const signOut = useSignOut(setToken, setIsAuthenticated, enqueueSnackbar); // Usando o hook useSignOut

  const value = {
    token,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    register,
    loginWithMetamask, // valor está sendo passado aqui talvez fazer um log para ver se está sendo passado corretamente
    registerWithMetamask,
  };

  return <DjangoAuthContext.Provider value={value}>{children}</DjangoAuthContext.Provider>;
};

export default DjangoAuthContext;
