import { useState, useEffect } from 'react';
import Web3 from 'web3';

export const useWeb3 = () => {
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        } else {
            console.warn("MetaMask is not installed!");
        }
    }, []);

    return web3;
};
