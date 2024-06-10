// @/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

// Metamask
import { useMetamaskConnect, useMetamaskUpdateStatus, useMetamaskSignOut } from '@/hooks';
// Django
import { useDjangoSignIn, useDjangoRegister, useDjangoSignOut, useDjangoMetamaskLogin, useDjangoMetamaskRegister } from '@/hooks';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // Metamask
  const [isMetamaskAuthenticated, setIsMetamaskAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [balance, setBalance] = useState("0"); // como faço para pegar o saldo do usuário?
  const [chainId, setChainId] = useState(null);
  // Django
  const [token, setToken] = useState(null);
  const [isDjangoAuthenticated, setIsDjangoAuthenticated] = useState(false);

  useEffect(() => {
    // console.log("Verificando localStorage para 'userAddress' e 'token'");
    const storedAddress = localStorage.getItem('userAddress');
    const tokenFromStorage = localStorage.getItem('token');
  
    // console.log("Endereço recuperado:", storedAddress);
    // console.log("Token recuperado:", tokenFromStorage);
  
    if (storedAddress) {
      setIsMetamaskAuthenticated(true);
      setUserAddress(storedAddress);
    }
  
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setIsDjangoAuthenticated(true);
    }
  }, []);
  
  

  // Metamask
  const metamaskUpdateStatus = useMetamaskUpdateStatus(setBalance, setChainId, enqueueSnackbar, setLoading);
  const metamaskConnect = useMetamaskConnect(setIsMetamaskAuthenticated, setUserAddress, enqueueSnackbar);
  const metamaskSignOut = useMetamaskSignOut(setIsMetamaskAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar);
  // Django
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
    metamaskIsAuthenticated: isMetamaskAuthenticated,
    metamaskLoading: loading,
    metamaskUserAddress: userAddress,
    metamaskBalance: balance,
    metamaskChainId: chainId,
    metamaskConnect,
    metamaskUpdateStatus,
    metamaskSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);