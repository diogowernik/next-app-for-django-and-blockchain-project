import React, { createContext, useContext, useState, useCallback } from 'react';
import MetamaskAuth from '../api/MetamaskAuth';

const MetamaskAuthContext = createContext({
  isAuthenticated: false,
  connectWithMetamask: async () => {},
  signOut: () => {},
});

export const MetamaskAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAddress, setUserAddress] = useState(null); // Adicione este estado para armazenar o endereço do usuário
    const metamaskManager = new MetamaskAuth();

    const connectWithMetamask = async () => {
        console.log("Trying to connect to MetaMask...");
        try {
            const userAddress = await metamaskManager.connect();
            if (userAddress) {
                console.log("Logged in with MetaMask using address:", userAddress); // aqui aparece o userAddress
                setIsAuthenticated(true);
                setUserAddress(userAddress);
            }
        } catch (error) {
            console.error('Error connecting with MetaMask:', error);
        }
    };

    const signOut = useCallback(() => {
        console.log("Logging out from MetaMask...");
        setIsAuthenticated(false);
    }, []);

    return (
        <MetamaskAuthContext.Provider value={{ connectWithMetamask, isAuthenticated, signOut, userAddress }}>
            {children}
        </MetamaskAuthContext.Provider>
    );
};

export const useMetamaskAuth = () => useContext(MetamaskAuthContext);
