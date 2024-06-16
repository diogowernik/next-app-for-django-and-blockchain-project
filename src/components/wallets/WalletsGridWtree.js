import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import providersData from "./utils/wtreeProviders";
import WalletWtree from "./WalletWtree";

const WalletsGridWtree = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    const onAnnounceProvider = (provider) => {
      console.log("Loaded provider:", provider.info.name);
      console.table(provider.info);
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

  return (
    <>
      {providers.size !== 0 ? (
        Array.from(providers.values()).map((provider) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={provider.info.uuid}>
            <WalletWtree provider={provider} />
          </Grid>
        ))
      ) : null}
    </>
  );
};

export default WalletsGridWtree;
