import React, { useEffect, useState } from 'react';
import { BitcoinNetworkType, getAddress } from 'sats-connect';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions, Avatar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useLocalStorage } from '@/hooks/auth/useLocalStorage';

const customWalletIds = ['unisat', 'xverse'];

const WalletCard = ({ wallet, connectWallet, disconnectWallet, walletInfo, isConnected }) => {
  const walletIcon = wallet.id === 'unisat' ? <AccountBalanceWalletIcon /> : <AccountBalanceWalletIcon />;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
        {walletIcon}
      </Avatar>
      <CardContent>
        <Typography variant="h5" component="div">
          {wallet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {wallet.id}
        </Typography>
        {isConnected && walletInfo && (
          <div>
            <Typography variant="h6">Connected</Typography>
            <Typography variant="body2">Payment Address: {walletInfo.paymentAddress}</Typography>
            <Typography variant="body2">Payment PubKey: {walletInfo.paymentPublicKey}</Typography>
            {walletInfo.ordinalsAddresses.map((address, index) => (
              <div key={index}>
                <Typography variant="body2">Ordinals Address: {address}</Typography>
                <Typography variant="body2">Ordinals PubKey: {walletInfo.ordinalsPublicKeys[index]}</Typography>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={connectWallet} disabled={isConnected}>
          Connect with {wallet.name}
        </Button>
        <Button onClick={disconnectWallet}>Disconnect</Button>
      </CardActions>
    </Card>
  );
};

const WalletsCardsBTC = () => {
  const [network, setNetwork] = useLocalStorage('btc_network', BitcoinNetworkType.Testnet);
  const [walletInfo, setWalletInfo] = useLocalStorage('btc_wallet_info', {});
  const [isConnected, setIsConnected] = useLocalStorage('btc_connected', false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Sinaliza que o cliente está pronto
  }, []);

  const wallets = [
    { id: 'unisat', name: 'Unisat' },
    { id: 'xverse', name: 'Xverse' },
  ];

  const connectWallet = async (walletId) => {
    if (walletId === 'unisat') {
      try {
        const result = await window.unisat.requestAccounts();
        handleAccountsChanged(walletId, result);
        setIsConnected(true);
      } catch (error) {
        console.log("Error connecting to Unisat:", error);
        setIsConnected(false);
      }
    } else if (walletId === 'xverse') {
      try {
        await getAddress({
          payload: {
            purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
            message: "Connect With Xverse",
            network: { type: network },
          },
          onFinish: (response) => {
            const paymentAddressItem = response.addresses.find(
              (address) => address.purpose === AddressPurpose.Payment
            );
            const ordinalsAddressItem = response.addresses.find(
              (address) => address.purpose === AddressPurpose.Ordinals
            );
            setWalletInfo({
              paymentAddress: paymentAddressItem?.address,
              paymentPublicKey: paymentAddressItem?.publicKey,
              ordinalsAddresses: ordinalsAddressItem ? [ordinalsAddressItem.address] : [],
              ordinalsPublicKeys: ordinalsAddressItem ? [ordinalsAddressItem.publicKey] : []
            });
            setIsConnected(true);
            console.log("Wallet connected");
          },
          onCancel: () => alert("Connection Request Canceled"),
        });
      } catch (error) {
        console.log("Error connecting to Xverse:", error);
      }
    }
  };

  const handleAccountsChanged = (walletId, accounts) => {
    if (walletId === 'unisat') {
      if (accounts.length > 0) {
        const unisat = window.unisat;
        unisat.getPublicKey().then((publicKeys) => {
          setWalletInfo({
            paymentAddress: accounts[0],
            paymentPublicKey: publicKeys[0],
            ordinalsAddresses: accounts,
            ordinalsPublicKeys: publicKeys
          });
        });
      }
    }
  };

  const disconnectWallet = () => {
    setWalletInfo({});
    setIsConnected(false);
  };

  if (!isClient) {
    return null; // Não renderiza nada até que o cliente esteja pronto
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {wallets.map((wallet) => (
          <Grid item xs={12} sm={6} md={4} key={wallet.id}>
            <WalletCard
              wallet={wallet}
              connectWallet={() => connectWallet(wallet.id)}
              disconnectWallet={disconnectWallet}
              walletInfo={walletInfo}
              isConnected={isConnected}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WalletsCardsBTC;
