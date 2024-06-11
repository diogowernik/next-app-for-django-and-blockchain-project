import React from 'react';
import { useConnect, useAccount, useBalance } from 'wagmi';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const customWalletIds = ['com.trustwallet.app', 'io.metamask'];

const WalletCard = ({ connector }) => {
  const { connect, error: connectError } = useConnect();
  const { address, addresses, chain, chainId, connector: activeConnector, isConnected, status, error: accountError } = useAccount();

  const { data: ethBalance, isLoading: isLoadingEthBalance, error: ethBalanceError } = useBalance({
    address: address,
    token: undefined, // ETH balance, so no token address
  });

  const { data: usdtBalance, isLoading: isLoadingUsdtBalance, error: usdtBalanceError } = useBalance({
    address: address,
    token: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT token address on Ethereum
  });

  const handleDisconnect = async () => {
    if (activeConnector) {
      try {
        await activeConnector.disconnect();
        console.log("Disconnected successfully.");
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    } else {
      console.log("No connector found to disconnect");
    }
  };

  const isCurrentConnector = activeConnector?.id === connector.id;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {connector.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {connector.id}
        </Typography>
        {isCurrentConnector && status === 'connected' && (
        <div>
          <Typography variant="h6">Connected</Typography>
          <Typography variant="body2">Account: {address}</Typography>
          <Typography variant="body2">Addresses: {addresses?.join(', ')}</Typography>
          <Typography variant="body2">Chain ID: {chainId}</Typography>
          <Typography variant="body2">Chain: {chain?.name}</Typography>
          <Typography variant='body2'>Connector ID: {connector.id}</Typography>
          <Typography variant="body2">Connector: {activeConnector?.name}</Typography>
          <Typography variant="body2">Is Connected: {isConnected.toString()}</Typography>
          <Typography variant="body2">Status: {status}</Typography>
          
          <Typography variant="h6">Balances</Typography>
          {isLoadingEthBalance ? (
            <Typography variant="body2">Loading ETH balance...</Typography>
          ) : ethBalanceError ? (
            <Typography variant="body2" color="error">Error loading ETH balance</Typography>
          ) : (
            <Typography variant="body2">ETH: {ethBalance?.formatted} {ethBalance?.symbol}</Typography>
          )}
          {isLoadingUsdtBalance ? (
            <Typography variant="body2">Loading USDT balance...</Typography>
          ) : usdtBalanceError ? (
            <Typography variant="body2" color="error">Error loading USDT balance</Typography>
          ) : (
            <Typography variant="body2">USDT: {usdtBalance?.formatted} {usdtBalance?.symbol}</Typography>
          )}
        </div>
      )}
      {isCurrentConnector && status === 'error' && (
        <div>
          <Typography variant="h6">Error</Typography>
          <Typography variant="body2">{accountError?.message}</Typography>
        </div>
      )}
      {isCurrentConnector && connectError && (
        <Typography variant="body1" color="error" mt={2}>
          Error: {connectError.message}
        </Typography>
      )}

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => connect({ connector })} disabled={isCurrentConnector && isConnected}>
          Connect with {connector.name}
        </Button>
        <Button onClick={handleDisconnect}>Disconnect</Button>
      </CardActions>
    </Card>
  );
};



const WagmiComponent = () => {
  const { connectors } = useConnect();
  const filteredConnectors = connectors.filter(connector => customWalletIds.includes(connector.id));

  return (
    <Container>
      <Grid container spacing={4}>
        {filteredConnectors.map((connector, index) => (
          <Grid item xs={12} key={`${connector.id}-${index}`}>
            <WalletCard connector={connector} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WagmiComponent;
