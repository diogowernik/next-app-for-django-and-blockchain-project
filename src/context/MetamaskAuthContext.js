// @context/MetamaskAuthContext.js

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import MetamaskAuth from '@/api/MetamaskAuth';

const MetamaskAuthContext = createContext({
    isAuthenticated: false,
    userAddress: null,
    balance: "0",
    chainId: null,
    connectWithMetamask: async () => {},
    getBalance: async () => {},
    signOut: () => {},
});

export const MetamaskAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [balance, setBalance] = useState("0");
    const [chainId, setChainId] = useState(null);
    const metamaskManager = new MetamaskAuth();

    useEffect(() => {
        const storedAddress = localStorage.getItem('userAddress');
        if (storedAddress) {
            setIsAuthenticated(true);
            setUserAddress(storedAddress);
        }
    }, []);

    const connectWithMetamask = async () => {
        const address = await metamaskManager.connect();
        if (address) {
            localStorage.setItem('userAddress', address);
            setIsAuthenticated(true);
            setUserAddress(address);
            updateBalanceAndChain();
        }
    };

    const updateBalanceAndChain = async () => {
        const balance = await metamaskManager.getBalance();
        setBalance(balance);
        setChainId(metamaskManager.chainId);
    };

    const signOut = useCallback(() => {
        localStorage.removeItem('userAddress');
        setIsAuthenticated(false);
        setUserAddress(null);
        setBalance("0");
        setChainId(null);
    }, []);

    return (
        <MetamaskAuthContext.Provider value={{ connectWithMetamask, isAuthenticated, signOut, userAddress, balance, chainId }}>
            {children}
        </MetamaskAuthContext.Provider>
    );
};

export const useMetamaskAuth = () => useContext(MetamaskAuthContext);

