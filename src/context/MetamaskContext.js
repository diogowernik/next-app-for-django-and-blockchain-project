// @context/MetamaskContext.js

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import WalletManager from '@/services/wallet/WalletManager';  // Importação atualizada


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
    const metamaskManager = new WalletManager();

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
        <MetamaskContext.Provider value={{ connectWithMetamask, isAuthenticated, signOut, userAddress, balance, chainId }}>
            {children}
        </MetamaskContext.Provider>
    );
};

export const useWalletManager = () => useContext(MetamaskContext);

