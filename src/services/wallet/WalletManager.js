// @services/wallet/WalletManager
import { initializeWeb3 } from './Web3Initializer';
import { setupEventListeners, removeEventListeners } from './EventHandlers';

class WalletManager {
    constructor() {
        this.web3 = initializeWeb3();
        this.userAddress = null;
        this.chainId = null;
        if (this.web3) {
            setupEventListeners(this.web3, this.handleAccountsChanged.bind(this), this.handleChainChanged.bind(this));
        }
    }

    handleAccountsChanged(accounts) {
        this.userAddress = accounts.length > 0 ? accounts[0] : null;
    }

    handleChainChanged(chainId) {
        this.chainId = chainId;
    }

    async connect() {
        console.log("Tentando conectar com MetaMask...");
    
        if (!this.web3) {
            console.error("Web3 não está inicializado.");
            return null;
        }
    
        try {
            const accounts = await this.web3.eth.requestAccounts();
            this.userAddress = accounts.length > 0 ? accounts[0] : null;
            this.chainId = await this.web3.eth.getChainId();
            console.log("Conexão bem-sucedida:", this.userAddress, this.chainId);
            return this.userAddress;
        } catch (error) {
            console.error("Erro ao conectar com MetaMask:", error);
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

    disconnect() {
        removeEventListeners(this.handleAccountsChanged.bind(this), this.handleChainChanged.bind(this));
        this.userAddress = null;
        this.chainId = null;
    }
}

export default WalletManager;
