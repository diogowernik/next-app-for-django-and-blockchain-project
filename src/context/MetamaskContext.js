import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useConnectWithMetamask, useUpdateBalanceAndChain, useSignOut } from '@/hooks/';

const MetamaskContext = createContext({
    isAuthenticated: false,
    userAddress: null,
    balance: "0",
    chainId: null,
    connectWithMetamask: async () => {},
    getBalance: async () => {},
    signOut: () => {},
});

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

    // Inicialize primeiro useUpdateBalanceAndChain
    const updateBalanceAndChain = useUpdateBalanceAndChain(setBalance, setChainId, enqueueSnackbar, setLoading);  
    // Depois use connectWithMetamask que depende de updateBalanceAndChain
    const connectWithMetamask = useConnectWithMetamask(setIsAuthenticated, setUserAddress, updateBalanceAndChain, enqueueSnackbar);
    const signOut = useSignOut(setIsAuthenticated, setUserAddress, setBalance, setChainId, enqueueSnackbar);

    const value = {
        metamaskIsAuthenticated: isAuthenticated,
        metamaskLoading: loading,
        metamaskUserAddress: userAddress,
        metamaskBalance: balance,
        metamaskChainId: chainId,
        metamaskConnect: connectWithMetamask,
        metamaskUpdateBalanceAndChain: updateBalanceAndChain,
        metamaskSignOut: signOut,
    };

    return (
        <MetamaskContext.Provider value={value}>
            {children}
        </MetamaskContext.Provider>
    );
};

export const useWalletManager = () => useContext(MetamaskContext);
