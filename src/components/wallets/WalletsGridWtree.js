import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import providersData from "./system/systemProviders";
import WalletWtree from "./system/WalletWtree";

const WalletsGridWtree = () => {
  const [providers, setProviders] = useState(new Map());

  // Função para adicionar ou atualizar um provedor no mapa de provedores
  const addOrUpdateProvider = (provider) => {
    setProviders((prevProviders) => {
      const providers = new Map(prevProviders);
      providers.set(provider.info.uuid, provider);
      return providers;
    });
  };

  useEffect(() => {
    providersData.forEach(({ provider }) => {
      console.log("Loaded provider:", provider.info.name);
      console.table(provider.info);
      const announcedProvider = {
        ...provider,
        accounts: [],
      };
      addOrUpdateProvider(announcedProvider);
    });
  }, []);

  return (
    <>
      {providers.size !== 0 ? (
        Array.from(providers.values()).map((provider) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={provider.info.uuid}>
            <WalletWtree provider={provider} />
          </Grid>
        ))
      ) : null}
    </>
  );
};

export default WalletsGridWtree;
