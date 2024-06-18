import React from "react";
import { Grid } from "@mui/material";
import useEVMProviders from "@/components/wallets/evm/useEvmProviders";
import WalletEVM from "@/components/wallets/evm/WalletEVM";

const WalletsEvmGrid = () => {
  const { providers, modifyProviders, connectProvider } = useEVMProviders();

  return (
    <>
      {providers.size !== 0 ? (
        Array.from(providers.values()).map((provider) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={provider.info.uuid}>
            <WalletEVM
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

export default WalletsEvmGrid;
