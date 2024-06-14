import React, { useState, useEffect } from "react";
import { Typography, Grid, Alert } from "@mui/material";
import providersData from "./utils/btcProviders";  // Atualizado o caminho
import WalletBTC from "./WalletBTC";

const WalletsGridBTC = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    const onAnnounceProvider = (provider) => {
      console.log("Loaded provider:", provider.info.name);
      console.table(provider.info);
      if (!provider.info.rdns) {
        console.log("RDNS is missing from provider info for provider:", provider.info.name);
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
    // Específico para BTC criar um evento para anunciar o provider com o mesmo nome,
    // a lógica vai para o arquivo btcProviders.js
    providersData.forEach(({ provider }) => onAnnounceProvider(provider));
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
    // criar um evento para conectar ao provider com o mesmo nome do EVM grid,
    // a lógica que for diferente vai para o arquivo btcProviders.js
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

  return (
<>
  {providers.size !== 0 ? (
    Array.from(providers.values()).map((provider) => (
      <Grid item xs={12} sm={6} md={6} lg={4} key={provider.info.uuid}>
        <WalletBTC
          clickHandler={() => connectProvider(provider)}
          provider={provider}
          modifyProviders={modifyProviders}
        />
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Alert severity="warning">
        No BTC providers found. Ensure you have a wallet configured.
      </Alert>
    </Grid>
  )}
</>
  );
};

export default WalletsGridBTC;
