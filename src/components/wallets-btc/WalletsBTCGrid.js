import React, { useState, useEffect } from "react";
import Wallet from "./components/Wallet";
import { Typography, Grid, Container } from "@mui/material";
import { BitcoinNetworkType, getAddress, AddressPurpose } from "sats-connect";
import { supportedWallets } from "./utils/constants";

const WalletsBtcGrid = () => {
  const [providers, setProviders] = useState(new Map());

  useEffect(() => {
    // Função para carregar os provedores de carteira BTC
    const loadBtcProviders = () => {
      const initialProviders = new Map(
        supportedWallets.map((wallet, index) => [
          wallet.name.toLowerCase(),
          {
            info: {
              uuid: `uuid-${index}`,
              name: wallet.name,
              icon: '',
              network: BitcoinNetworkType.Testnet,
            },
            accounts: [],
            connected: false,
            publicKeys: [],
          },
        ])
      );
      setProviders(initialProviders);
    };

    loadBtcProviders();
  }, []);

  const modifyProviders = (updatedProvider) => {
    setProviders((prevProviders) => {
      const newProviders = new Map(prevProviders);
      newProviders.set(updatedProvider.info.name.toLowerCase(), updatedProvider);
      return newProviders;
    });
  };

  const connectProvider = async (provider) => {
    try {
      let accounts = [];
      let publicKeys = [];

      if (provider.info.name.toLowerCase() === "unisat") {
        const unisat = window.unisat;
        accounts = await unisat.requestAccounts();
        publicKeys = await Promise.all(accounts.map(() => unisat.getPublicKey()));
      } else if (provider.info.name.toLowerCase() === "xverse") {
        await getAddress({
          payload: {
            purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
            message: `Connect With ${provider.info.name}`,
            network: { type: provider.info.network },
          },
          onFinish: (response) => {
            const paymentAddressItem = response.addresses.find(
              (address) => address.purpose === AddressPurpose.Payment
            );
            const ordinalsAddressItem = response.addresses.find(
              (address) => address.purpose === AddressPurpose.Ordinals
            );

            accounts = [
              paymentAddressItem?.address,
              ordinalsAddressItem ? ordinalsAddressItem.address : null,
            ].filter(Boolean);

            publicKeys = [
              paymentAddressItem?.publicKey,
              ordinalsAddressItem ? ordinalsAddressItem.publicKey : null,
            ].filter(Boolean);

            modifyProviders({
              ...provider,
              accounts,
              publicKeys,
              connected: true,
            });
          },
          onCancel: () => alert("Connection Request Canceled"),
        });
      }

      if (accounts.length > 0) {
        modifyProviders({
          ...provider,
          accounts,
          publicKeys,
          connected: true,
        });
      }
    } catch (error) {
      console.error("Failed to connect to BTC provider:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {providers.size !== 0 ? (
          Array.from(providers.values()).map((provider) => (
            <Grid item xs={12} sm={6} md={4} key={provider.info.uuid}>
              <Wallet
                clickHandler={() => connectProvider(provider)}
                provider={provider}
                modifyProviders={modifyProviders}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">
              No BTC providers found. Ensure you have a wallet configured.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default WalletsBtcGrid;
