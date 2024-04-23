export function setupEventListeners(web3, handleAccountsChanged, handleChainChanged) {
    if (web3) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
    }
}

export function removeEventListeners(handleAccountsChanged, handleChainChanged) {
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
}
