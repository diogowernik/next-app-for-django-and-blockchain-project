import { useState, useEffect } from "react";
import { chainIDtoName } from "@/components/wallets/utils/functions";

const useWalletEVM = (provider, modifyProviders) => {
  const [chain, setChain] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const isConnected = !!provider.accounts.length;

  useEffect(() => {
    if (!provider.provider) return;
    const currentProvider = provider.provider;
    currentProvider.on("accountsChanged", (accounts) => {
      console.log("accountsChanged", accounts);
      provider.accounts = accounts;
      modifyProviders(provider);
    });
    currentProvider.on("chainChanged", async (chainID) => {
      console.log("chainChanged", chainID);
      const chainName = await chainIDtoName(chainID);
      setChain(chainName);
    });
    currentProvider.on("disconnect", (error) => {
      console.log("disconnect", error);
    });
  }, [provider.provider, provider, modifyProviders]);

  useEffect(() => {
    async function getCurrentChainName() {
      if (!provider.provider) return;
      const currentProvider = provider.provider;
      const chainID = await currentProvider.request({
        method: "eth_chainId",
      });
      const chainName = await chainIDtoName(chainID);
      setChain(chainName);
    }
    getCurrentChainName();
    console.log("Connected: ", isConnected);
  }, [provider.provider]);

  return {
    chain,
    isConnecting,
    setIsConnecting,
    isConnected,
  };
};

export default useWalletEVM;
