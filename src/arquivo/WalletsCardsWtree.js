import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import EthereumIcon from '@mui/icons-material/AccountBalanceWallet'; // Use an appropriate icon for Ethereum
import BitcoinIcon from '@mui/icons-material/AccountBalanceWallet'; // Use an appropriate icon for Bitcoin

const ethWalletInfo = {
  name: 'ETH Wallet',
  address: '0xYourEthereumAddress',
  balance: '10 ETH'
};

const btcWalletInfo = {
  name: 'BTC Wallet',
  address: '1YourBitcoinAddress',
  balance: '0.5 BTC'
};

const WalletCard = ({ walletInfo, walletIcon }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
    <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
      {walletIcon}
    </Avatar>
    <CardContent>
      <Typography variant="h5" component="div">
        {walletInfo.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Address: {walletInfo.address}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Balance: {walletInfo.balance}
      </Typography>
    </CardContent>
  </Card>
);

const WalletsCardsWtree = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <WalletCard walletInfo={ethWalletInfo} walletIcon={<EthereumIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <WalletCard walletInfo={btcWalletInfo} walletIcon={<BitcoinIcon />} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WalletsCardsWtree;
