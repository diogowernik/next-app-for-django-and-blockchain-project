// @api/MetamaskAuth.js

import Web3 from 'web3';

class MetamaskAuth {
    constructor() {
        this.web3 = null;
        this.walletConnected = false;
        this.userAddress = null;
        this.chainId = null;
        this.init();
    }

    init() {
        if (typeof window !== 'undefined' && window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            window.ethereum.on('accountsChanged', (accounts) => this.handleAccountsChanged(accounts));
            window.ethereum.on('chainChanged', (chainId) => this.handleChainChanged(chainId));
        } else {
            console.warn("MetaMask is not installed!");
        }
    }

    handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
            this.userAddress = accounts[0];
            this.walletConnected = true;
        } else {
            this.userAddress = null;
            this.walletConnected = false;
        }
        console.log("Accounts changed:", accounts);
    }

    handleChainChanged(chainId) {
        this.chainId = chainId;
        console.log("Chain changed to:", chainId);
        this.web3.setProvider(window.ethereum);
    }

    async connect() {
        if (!this.web3) {
            console.error("Web3 not initialized. MetaMask might not be installed.");
            return null;
        }
        try {
            const accounts = await this.web3.eth.requestAccounts();
            this.userAddress = accounts.length > 0 ? accounts[0] : null;
            this.walletConnected = !!this.userAddress;
            this.chainId = await this.web3.eth.getChainId();
            return this.userAddress;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            return null;
        }
    }

    async getBalance() {
        if (!this.userAddress || !this.web3) {
            return "0";
        }
        const balanceWei = await this.web3.eth.getBalance(this.userAddress);
        return this.web3.utils.fromWei(balanceWei, 'ether');
    }

    get isConnected() {
        return this.walletConnected;
    }
}

export default MetamaskAuth;
