import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { initializeEVMProviders } from "./utils/evmProviders";
import WalletEVM from "./WalletEVM";

const WalletsEvmGrid = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    const onAnnounceProvider = (event) => {
      console.log("Event Triggered: ", event.type);
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

    const cleanup = initializeEVMProviders(onAnnounceProvider);
    return cleanup;
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

  return (
    <>
      {providers.size !== 0 ? (
        Array.from(providers.values()).map((provider) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={provider.info.uuid}>
            <WalletEVM
              clickHandler={() => connectProvider(provider)}
              provider={provider}
              modifyProviders={modifyProviders}
            />
          </Grid>
        ))
      ) : null}
    </>
  );
};

export default WalletsEvmGrid;
