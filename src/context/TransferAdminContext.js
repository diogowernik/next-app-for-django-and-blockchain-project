// @/context/TransferAdminContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { contractManager } from '@/services/contract';

const TransferAdminContext = createContext();

export const TransferAdminProvider = ({ children }) => {
    const [currentNetwork, setCurrentNetwork] = useState('bscTestnet');
    const [tokenTransferGateway, setTransferGateway] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        loadContract();
    }, [currentNetwork]);

    const loadContract = async () => {
        try {
            const contract = contractManager.loadContract('TransferGateway', currentNetwork);
            setTransferGateway(contract);
            const paused = await contract.methods.paused().call();
            setIsPaused(paused);
        } catch (error) {
            console.error("Failed to load the contract:", error);
        }
    };

    const setWhitelistToken = async (tokenAddress, isAllowed) => {
        if (!tokenTransferGateway) {
            console.error("Contract not loaded");
            return;
        }

        try {
            const response = await tokenTransferGateway.methods.setTokenWhitelist(tokenAddress, isAllowed).send({ from: window.ethereum.selectedAddress });
            return response;
        } catch (error) {
            console.error("Error updating token whitelist:", error);
            throw error;
        }
    };

    const setTransactionFee = async (newFeeBps) => {
        if (!tokenTransferGateway) {
            console.error("Contract not loaded");
            return;
        }

        try {
            const response = await tokenTransferGateway.methods.setFee(newFeeBps).send({ from: window.ethereum.selectedAddress });
            return response;
        } catch (error) {
            console.error("Error setting transaction fee:", error);
            throw error;
        }
    };

    const pause = async () => {
        if (!tokenTransferGateway) {
            console.error("Contract not loaded");
            return;
        }

        try {
            const response = await tokenTransferGateway.methods.pause().send({ from: window.ethereum.selectedAddress });
            setIsPaused(true);
            return response;
        } catch (error) {
            console.error("Error pausing contract:", error);
            throw error;
        }
    };

    const unpause = async () => {
        if (!tokenTransferGateway) {
            console.error("Contract not loaded");
            return;
        }

        try {
            const response = await tokenTransferGateway.methods.unpause().send({ from: window.ethereum.selectedAddress });
            setIsPaused(false);
            return response;
        } catch (error) {
            console.error("Error unpausing contract:", error);
            throw error;
        }
    };

    const changeNetwork = (networkName) => {
        setCurrentNetwork(networkName);
    };

    const value = {
        setWhitelistToken,
        setTransactionFee,
        pause,
        unpause,
        changeNetwork,
        network: currentNetwork,
        isPaused,
        contractLoaded: !!tokenTransferGateway,
    };

    return (
        <TransferAdminContext.Provider value={value}>
            {children}
        </TransferAdminContext.Provider>
    );
};

export const useTransferAdmin = () => useContext(TransferAdminContext);
