import { useState, useEffect } from "react";
import { initializeEVMProviders } from "@/components/wallets/evm/evmProviders";

const useEvmProviders = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    const onAnnounceProvider = (event) => {
      console.log("Loaded provider:", event.detail.info.name);
      console.table(event.detail.info);
      if (!event.detail.info.rdns) {
        console.log("RDNS is missing from provider info");
      }
      const announcedProvider = {
        ...event.detail,
        accounts: [],
      };

      setProviders((prevProviders) => {
        const providers = new Map(prevProviders);
        providers.set(announcedProvider.info.uuid, announcedProvider);
        return providers;
      });
    };

    return initializeEVMProviders(onAnnounceProvider);
  }, []);

  const modifyProviders = (selectedProvider) => {
    setProviders((prevProviders) => {
      const providers = new Map(prevProviders);
      providers.set(selectedProvider.info.uuid, selectedProvider);
      return providers;
    });
  };

  const connectProvider = async (selectedProvider) => {
    const request = selectedProvider.request ?? selectedProvider.provider.request;
    try {
      const accounts = await request({
        method: "eth_requestAccounts",
      });
      setProviders((prevProviders) => {
        const providers = new Map(prevProviders);
        providers.set(selectedProvider.info.uuid, {
          ...selectedProvider,
          accounts,
        });
        return providers;
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to connect to provider");
    }
  };

  return {
    providers,
    modifyProviders,
    connectProvider,
  };
};

export default useEvmProviders;
