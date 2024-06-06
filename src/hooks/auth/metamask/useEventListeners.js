import { useEffect } from 'react';

export const useEventListeners = (web3, handleAccountsChanged, handleChainChanged) => {
    useEffect(() => {
        if (web3) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        }
        return () => {
            if (web3) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, [web3, handleAccountsChanged, handleChainChanged]);
};
