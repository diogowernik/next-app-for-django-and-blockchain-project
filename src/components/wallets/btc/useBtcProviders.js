import { useState, useEffect } from "react";
import providersData from "@/components/wallets/btc/btcProviders";

const useBtcProviders = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    const onAnnounceProvider = (provider) => {
      console.log("Loaded provider:", provider.info.name);
      console.table(provider.info);
      if (!provider.info.rdns) {
        console.log("RDNS is missing from provider info");
      }
      const announcedProvider = {
        ...provider,
        accounts: [],
      };

      setProviders((prevProviders) => {
        const providers = new Map(prevProviders);
        providers.set(announcedProvider.info.uuid, announcedProvider);
        return providers;
      });
    };

    providersData.forEach(({ provider }) => onAnnounceProvider(provider));
  }, []);

  const modifyProviders = (selectedProvider) => {
    setProviders((prevProviders) => {
      const providers = new Map(prevProviders);
      providers.set(selectedProvider.info.uuid, selectedProvider);
      return providers;
    });
  };

  const connectProvider = async (selectedProvider) => {
    try {
      const { accounts, publicKeys } = await selectedProvider.connect(selectedProvider.info);
      if (accounts.length > 0) {
        modifyProviders({
          ...selectedProvider,
          accounts,
          publicKeys,
          connected: true,
        });
        console.log(`Connected to provider: ${selectedProvider.info.name}`);
      }
    } catch (error) {
      console.error("Failed to connect to provider:", error);
    }
  };

  return {
    providers: Array.from(providers.values()),
    connectProvider,
    modifyProviders,
  };
};

export default useBtcProviders;
