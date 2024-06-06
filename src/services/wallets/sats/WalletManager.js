import {
    AddressPurpose,
    BitcoinNetworkType,
    getAddress,
    getCapabilities,
    request,
} from "sats-connect";

export class WalletManager {
    constructor() {
        this.paymentAddress = null;
        this.paymentPublicKey = null;
        this.ordinalsAddress = null;
        this.ordinalsPublicKey = null;
        this.stacksAddress = null;
        this.network = BitcoinNetworkType.Testnet;
        this.capabilities = new Set();
        this.isReady = false;
        this.capabilityState = "loading";
    }

    async checkCapabilities() {
        try {
            const capabilities = await getCapabilities({
                payload: { network: { type: this.network } },
                onFinish: response => {
                    this.capabilities = new Set(response);
                    this.capabilityState = "loaded";
                },
                onCancel: () => {
                    this.capabilityState = "cancelled";
                }
            });
        } catch (error) {
            this.capabilityState = "missing";
            console.error("Error loading capabilities:", error);
        }
    }

    async connect() {
        try {
            const response = await getAddress({
                payload: {
                    purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
                    network: { type: this.network },
                }
            });
            
            // Verificando se a resposta não é undefined antes de acessar suas propriedades
            if (!response) {
                console.error("No response from getAddress");
                return;
            }
    
            if (response.status === 'success') {
                this.paymentAddress = response.addresses.find(a => a.purpose === AddressPurpose.Payment)?.address;
                this.paymentPublicKey = response.addresses.find(a => a.purpose === AddressPurpose.Payment)?.publicKey;
                this.ordinalsAddress = response.addresses.find(a => a.purpose === AddressPurpose.Ordinals)?.address;
                this.ordinalsPublicKey = response.addresses.find(a => a.purpose === AddressPurpose.Ordinals)?.publicKey;
                this.stacksAddress = response.addresses.find(a => a.purpose === AddressPurpose.Stacks)?.address;
                this.isReady = true;
                console.log("Wallet connected: ", this.paymentAddress);
            } else {
                console.error("Error in response status:", response.status);
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    }
    

    disconnect() {
        this.paymentAddress = null;
        this.paymentPublicKey = null;
        this.ordinalsAddress = null;
        this.ordinalsPublicKey = null;
        this.stacksAddress = null;
        this.isReady = false;
        console.log("Wallet disconnected");
    }

    // Adding getNetwork method to fetch the current network type from the wallet
    async getNetwork() {
        try {
            const currentNetworkType = await request('getNetwork');
            this.network = currentNetworkType;
            console.log('Current Network:', this.network);
            return this.network;
        } catch (error) {
            console.error('Failed to fetch network:', error);
            return null;
        }
    }
}

const satsManager = new WalletManager();

export { satsManager };
