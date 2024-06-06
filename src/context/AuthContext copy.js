// @/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useSatsWalletAddresses } from '@/hooks/auth/satswallet/useSatsWalletAddresses';
import { useSatsNetwork } from '@/hooks/auth/satswallet/useSatsNetwork';
import { useSatsConnect, useSatsSignOut } from '@/hooks/auth/satswallet';
import { useLocalStorage } from '@/hooks/auth/satswallet/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Estado de carregamento e autenticação
  const [loading, setLoading] = useState(false);
  const [isSatsAuthenticated, setIsSatsAuthenticated] = useLocalStorage('satsAuthenticated', false);

  // Hooks específicos do Sats Connect
  const satsWalletAddresses = useSatsWalletAddresses();
  const { satsNetwork, toggleSatsNetwork } = useSatsNetwork();

  // Sats Connect autenticação e logout
  const satsConnect = useSatsConnect(satsWalletAddresses, setIsSatsAuthenticated, enqueueSnackbar);
  const satsSignOut = useSatsSignOut(setIsSatsAuthenticated, satsWalletAddresses.resetAddresses, enqueueSnackbar);

  const handleSatsConnect = (newNetwork) => {
    if (!isSatsAuthenticated) {
      satsConnect(newNetwork);
    } else {
      enqueueSnackbar('You are already connected.', { variant: 'info' });
    }
  };

  const handleSatsDisconnect = () => {
    if (isSatsAuthenticated) {
      satsSignOut();
    } else {
      enqueueSnackbar('No active connection to disconnect.', { variant: 'warning' });
    }
  };

  const value = {
    isSatsAuthenticated,
    satsNetwork,
    toggleSatsNetwork,
    handleSatsConnect,
    handleSatsDisconnect,
    loading,
    setLoading,
    satsWalletAddresses,
    enqueueSnackbar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
