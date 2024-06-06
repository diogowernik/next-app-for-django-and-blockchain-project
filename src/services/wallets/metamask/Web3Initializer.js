import Web3 from 'web3';

export function initializeWeb3() {
    if (typeof window !== 'undefined' && window.ethereum) {
        return new Web3(window.ethereum);
    } else {
        console.warn("MetaMask is not installed!");
        return null;
    }
}
