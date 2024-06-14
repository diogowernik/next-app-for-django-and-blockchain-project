import React, { useState, useEffect } from "react";
import { Grid, Alert } from "@mui/material";
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
    // Específico para EVM criar um evento para anunciar o provider com o mesmo nome
    // a lógica vai para o arquivo evmProviders.js
    const cleanup = initializeEVMProviders(onAnnounceProvider);
    return cleanup;
  }, []);

  // já está igual
  const modifyProviders = (selectedProvider) => {
    setProviders((prevProviders) => {
      const providers = new Map(prevProviders);
      providers.set(selectedProvider.info.uuid, selectedProvider);
      return providers;
    });
  };

  const connectProvider = async (selectedProvider) => {
    // criar um evento para conectar ao provider com o mesmo nome do BTC grid
    // a lógica que for diferente vai para o arquivo evmProviders.js
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
  ) : (
    <Grid item xs={12}>
      <Alert severity="warning">
        No EIP-6963 compatible providers found. Ensure you have a wallet configured.
      </Alert>
    </Grid>
  )}
</>
  );
};

export default WalletsEvmGrid;
