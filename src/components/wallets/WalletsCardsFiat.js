import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const fiatWallets = [
  {
    name: 'BRL Wallet',
    currency: 'BRL',
    balance: 'R$ 1000,00'
  },
  {
    name: 'USD Wallet',
    currency: 'USD',
    balance: '$ 500,00'
  },
  {
    name: 'EUR Wallet',
    currency: 'EUR',
    balance: '€ 800,00'
  }
];

const WalletCard = ({ walletInfo }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
    <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
      <AccountBalanceIcon />
    </Avatar>
    <CardContent>
      <Typography variant="h5" component="div">
        {walletInfo.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Currency: {walletInfo.currency}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Balance: {walletInfo.balance}
      </Typography>
    </CardContent>
  </Card>
);

const WalletCardsFiat = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {fiatWallets.map((wallet, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <WalletCard walletInfo={wallet} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WalletCardsFiat;
