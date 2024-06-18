import React from "react";
import { Grid } from "@mui/material";
import WalletBTC from "@/components/wallets/btc/WalletBTC";
import useBtcProviders from "@/components/wallets/btc/useBtcProviders";

const WalletsGridBTC = () => {
  const { providers, connectProvider, modifyProviders } = useBtcProviders();

  return (
    <>
      {providers.length !== 0 ? (
        providers.map((provider) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={provider.info.uuid}>
            <WalletBTC
              connectProvider={() => connectProvider(provider)}
              provider={provider}
              modifyProviders={modifyProviders}
            />
          </Grid>
        ))
      ) : null}
    </>
  );
};

export default WalletsGridBTC;
