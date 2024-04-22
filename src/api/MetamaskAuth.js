// apis/MetamaskAuth.js

import Web3 from 'web3';

class MetamaskAuth {
    constructor() {
        this.walletConnected = false;
        this.userAddress = null;
        this.provider = null;
    }

    async connect() {
        if (typeof window === 'undefined' || !window.ethereum) {
            console.warn("MetaMask is not installed!");
            return null;
        }

        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.requestAccounts();
            if (accounts.length > 0) {
                this.walletConnected = true;
                this.userAddress = accounts[0];
                return this.userAddress;
            } else {
                this.walletConnected = false;
                console.warn("Wallet not connected");
                return null;
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            return null;
        }
    }

    get isConnected() {
        return this.walletConnected;
    }
}

export default MetamaskAuth;
