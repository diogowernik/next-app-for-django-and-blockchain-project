// @/context/TransferContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { contractManager } from '@/services/contract';

const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
    const [currentNetwork, setCurrentNetwork] = useState('bscTestnet');
    const [tokenTransferGateway, setTransferGateway] = useState(null);
    const [currentFee, setCurrentFee] = useState(0);

    useEffect(() => {
        loadContract();
    }, [currentNetwork]);

    const loadContract = async () => {
        try {
            const contract = contractManager.loadContract('TransferGateway', currentNetwork);
            setTransferGateway(contract);
            const feeBps = await contract.methods.feeBps().call();
            setCurrentFee(feeBps);
        } catch (error) {
            console.error("Failed to load the contract:", error);
        }
    };

    const transferToken = async (token, recipient, amount) => {
        if (!tokenTransferGateway) {
            console.error("Contract not loaded");
            return;
        }

        try {
            const response = await tokenTransferGateway.methods.transferToken(token, recipient, amount).send({ from: window.ethereum.selectedAddress });
            return response;
        } catch (error) {
            console.error("Error transferring token:", error);
            throw error;
        }
    };

    const transferNative = async (recipient, amount) => {
        if (!tokenTransferGateway) {
            console.error("Contract not loaded");
            return;
        }

        try {
            const response = await tokenTransferGateway.methods.transferNative(recipient).send({ from: window.ethereum.selectedAddress, value: amount });
            return response;
        } catch (error) {
            console.error("Error transferring native currency:", error);
            throw error;
        }
    };

    const changeNetwork = (networkName) => {
        setCurrentNetwork(networkName);
    };

    const value = {
        transferToken,
        transferNative,
        changeNetwork,
        network: currentNetwork,
        currentFee,
        contractLoaded: !!tokenTransferGateway,
    };

    return (
        <TransferContext.Provider value={value}>
            {children}
        </TransferContext.Provider>
    );
};

export const useTransfer = () => useContext(TransferContext);
