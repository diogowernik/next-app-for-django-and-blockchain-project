// @/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

// Metamask
import { useMetamaskConnect, useMetamaskUpdateStatus, useMetamaskSignOut } from '@/hooks';
// Django
import { useDjangoSignIn, useDjangoRegister, useDjangoSignOut, useDjangoMetamaskLogin } from '@/hooks';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado de carregamento e notificação
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Metamask
  const [isMetamaskAuthenticated, setIsMetamaskAuthenticated] = useState(false);
  const [metamaskUserAddress, setMetamaskUserAddress] = useState(null);
  const [metamaskBalance, setMetamaskBalance] = useState("0");
  const [metamaskChainId, setMetamaskChainId] = useState(null);

  // Django
  const [djangoToken, setDjangoToken] = useState(null);
  const [isDjangoAuthenticated, setIsDjangoAuthenticated] = useState(false);

  // Verificar se o usuário já está autenticado no Metamask e/ou Django
  useEffect(() => {
    console.log("Verificando localStorage para 'userAddress' e 'token'");
    const storedAddress = localStorage.getItem('userAddress');
    const tokenFromStorage = localStorage.getItem('token');
  
    console.log("Endereço recuperado:", storedAddress);
    console.log("Token recuperado:", tokenFromStorage);
  
    if (storedAddress) {
      setIsMetamaskAuthenticated(true);
      setMetamaskUserAddress(storedAddress);
    }
  
    if (tokenFromStorage) {
      setDjangoToken(tokenFromStorage);
      setIsDjangoAuthenticated(true);
    }
  }, []);
  
  // Metamask
  const metamaskUpdateStatus = useMetamaskUpdateStatus(setMetamaskBalance, setMetamaskChainId, enqueueSnackbar, setLoading);
  const metamaskConnect = useMetamaskConnect(setIsMetamaskAuthenticated, setMetamaskUserAddress, enqueueSnackbar);
  const metamaskSignOut = useMetamaskSignOut(setIsMetamaskAuthenticated, setMetamaskUserAddress, setMetamaskBalance, setMetamaskChainId, enqueueSnackbar);

  // Django
  const djangoSignIn = useDjangoSignIn(setDjangoToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoRegister = useDjangoRegister(setDjangoToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 
  const djangoSignOut = useDjangoSignOut(setDjangoToken, setIsDjangoAuthenticated, enqueueSnackbar); 
  const djangoMetamaskLogin = useDjangoMetamaskLogin(setDjangoToken, setIsDjangoAuthenticated, setLoading, enqueueSnackbar); 

  const value = {
    // Django
    djangoToken,
    isDjangoAuthenticated,
    djangoLoading: loading,
    djangoSignIn,
    djangoSignOut,
    djangoRegister,
    djangoMetamaskLogin,
    // Metamask
    isMetamaskAuthenticated,
    metamaskLoading: loading,
    metamaskUserAddress,
    metamaskBalance,
    metamaskChainId,
    metamaskConnect,
    metamaskUpdateStatus,
    metamaskSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
