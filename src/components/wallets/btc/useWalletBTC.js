import { useState, useEffect } from "react";

const useWalletBTC = (provider, modifyProviders) => {
  const [chain, setChain] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const isConnected = !!provider.accounts.length;

  useEffect(() => {
    if (!provider.provider) return;

    const handleAccountsChanged = (accounts) => {
      console.log("accountsChanged", accounts);
      provider.accounts = accounts;
      modifyProviders(provider);
    };

    const handleChainChanged = (network) => {
      console.log("networkChanged", network);
      setChain(network);
    };

    window.addEventListener("accountsChanged", handleAccountsChanged);
    window.addEventListener("chainChanged", handleChainChanged);

    return () => {
      window.removeEventListener("accountsChanged", handleAccountsChanged);
      window.removeEventListener("chainChanged", handleChainChanged);
    };
  }, [provider.provider, provider, modifyProviders]);

  useEffect(() => {
    async function getCurrentChainName() {
      const chain = provider.info.network;
      setChain(chain);
    }
    getCurrentChainName();
    console.log("Connected: ", isConnected);
  }, [provider]);

  return {
    chain,
    isConnecting,
    isConnected,
    setIsConnecting,
  };
};

export default useWalletBTC;
