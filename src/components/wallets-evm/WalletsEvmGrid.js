import React, { useState, useEffect } from "react";
import Wallet from "./components/Wallet";
import { Typography, Grid, Container } from "@mui/material";
import { isDataURI } from "./utils/functions";

const WalletsEvmGrid = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    const onAnnounceProvider = (event) => {
      console.log("Event Triggered: ", event.type);
      console.table(event.detail.info);
      if (event.detail.info.icon && !isDataURI(event.detail.info.icon)) {
        console.log("Icon is not a valid svg data URI");
      }
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

    window.addEventListener("eip6963:announceProvider", onAnnounceProvider);

    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () => {
      window.removeEventListener("eip6963:announceProvider", onAnnounceProvider);
    };
  }, []);

  const connectProvider = async (selectedProvider) => {
    const request =
      selectedProvider.request ?? selectedProvider.provider.request;
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

  const modifyProviders = (selectedProvider) => {
    setProviders((prevProviders) => {
      const providers = new Map(prevProviders);
      providers.set(selectedProvider.info.uuid, selectedProvider);
      return providers;
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {providers.size !== 0 ? (
          Array.from(providers).map(([_, provider]) => (
            <Grid item xs={12} sm={6} md={4} key={provider.info.uuid}>
              <Wallet
                clickHandler={async () => await connectProvider(provider)}
                provider={provider}
                modifyProviders={modifyProviders}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              {typeof window !== "undefined" && window.ethereum
                ? `No EIP-6963 compatible providers found`
                : `No EIP-6963 or window.ethereum providers found. Make sure you have a wallet installed.`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default WalletsEvmGrid;