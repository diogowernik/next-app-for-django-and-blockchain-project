import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useMetamaskConnect, useMetamaskUpdateStatus, useMetamaskSignOut } from '@/hooks/';

const MetamaskContext = createContext();

export const MetamaskProvider = ({ children }) => {
    const [isMetamaskAuthenticated, setIsMetamaskAuthenticated] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [balance, setBalance] = useState("0");
    const [chainId, setChainId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const storedAddress = localStorage.getItem('userAddress');
        if (storedAddress) {
            setIsMetamaskAuthenticated(true);
            setUserAddress(storedAddress);
        }
    }, []);

    const metamaskUpdateStatus = useMetamaskUpdateStatus(setBalance, setChainId, enqueueSnackbar, setLoading);
    const metamaskConnect = useMetamaskConnect(setIsMetamaskAuthenticated, setUserAddress, enqueueSnackbar);
    const metamaskSignOut = useMetamaskSignOut(setIsMetamaskAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar);

    const value = {
        metamaskIsMetamaskAuthenticated: isMetamaskAuthenticated,
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
