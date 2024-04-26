import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useMetamaskConnect, useMetamaskUpdateStatus, useMetamaskSignOut } from '@/hooks/';

const MetamaskContext = createContext();

export const MetamaskProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [balance, setBalance] = useState("0");
    const [chainId, setChainId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const storedAddress = localStorage.getItem('userAddress');
        if (storedAddress) {
            setIsAuthenticated(true);
            setUserAddress(storedAddress);
        }
    }, []);

    const metamaskUpdateStatus = useMetamaskUpdateStatus(setBalance, setChainId, enqueueSnackbar, setLoading);
    const metamaskConnect = useMetamaskConnect(setIsAuthenticated, setUserAddress, enqueueSnackbar);
    const metamaskSignOut = useMetamaskSignOut(setIsAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar);

    const value = {
        metamaskIsAuthenticated: isAuthenticated,
        metamaskLoading: loading,
        metamaskUserAddress: userAddress,
        metamaskBalance: balance,
        metamaskChainId: chainId,
        metamaskConnect,
        metamaskUpdateStatus,
        metamaskSignOut,
    };

    return (
        <MetamaskContext.Provider value={value}>
            {children}
        </MetamaskContext.Provider>
    );
};

export const useWalletManager = () => useContext(MetamaskContext);
