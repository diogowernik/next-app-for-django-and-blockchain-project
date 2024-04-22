import React, { createContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { 
  // signIn as signInApi, # Feito
  // register as registerApi,
  signInWithMetamask as signInWithMetamaskApi,
  registerWithMetamask as registerWithMetamaskApi
} from '@/api/DjangoAuth';
import { useSignIn, useRegister } from '@/hooks';  // Importe o hook useRegister


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
      setIsAuthenticated(true);  // Atualizar o estado de autenticação baseado na presença do token
    }
  }, []);

  // register sign in with username and password
  const signIn = useSignIn(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); // Passando funções e estados como argumentos
  const register = useRegister(setToken, setIsAuthenticated, setLoading, enqueueSnackbar); // Usando o hook useRegister


  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);  // Definir como não autenticado
    enqueueSnackbar('Logged out successfully.', { variant: 'success' });
  };

  // register and sign in with MetaMask
  const registerWithMetamask = async (address, signature) => {
    setLoading(true);
    try {
      const response = await registerWithMetamaskApi(address, signature);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setIsAuthenticated(true);
        enqueueSnackbar('Registration via MetaMask successful!', { variant: 'success' });
      } else {
        enqueueSnackbar('Registration via MetaMask failed.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'An error occurred.', { variant: 'error' });
    }
    setLoading(false);
  };

  const signInWithMetamask = async (address, signature) => {
    setLoading(true);
    try {
      const response = await signInWithMetamaskApi(address, signature);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setIsAuthenticated(true);
        enqueueSnackbar('Login via MetaMask successful!', { variant: 'success' });
      } else {
        enqueueSnackbar('Login via MetaMask failed.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message || 'An error occurred.', { variant: 'error' });
    }
    setLoading(false);
  };

  const value = {
    token,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    register,
    signInWithMetamask,
    registerWithMetamask,
  };

  return <DjangoAuthContext.Provider value={value}>{children}</DjangoAuthContext.Provider>;
};

export default DjangoAuthContext;
