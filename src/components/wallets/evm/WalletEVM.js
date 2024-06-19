import React from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Grid, CardActionArea, Button, useTheme } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { truncateAddress } from "@/components/wallets/utils/functions";
import useWalletEVM from "@/components/wallets/evm/useWalletEVM";
import ConnectButton from "@/components/wallets/utils/ConnectButton";

const WalletEVM = (props) => {
  const { connectProvider, provider, modifyProviders } = props;
  const { chain, isConnecting, setIsConnecting, isConnected } = useWalletEVM(provider, modifyProviders);

  return (
    <Card sx={{ height: '280px', position: 'relative' }}>
      <CardHeader
        avatar={
          <Avatar src={provider.info.icon} alt={provider.info.name} sx={{ width: 42, height: 48, borderRadius: 0, objectFit: 'contain' }} />
        }
        title={
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            {provider.info.name}
          </Typography>
        }
        subheader={provider.info.rdns && <Typography variant="body2">{`RDNS: ${provider.info.rdns}`}</Typography>}
      />
      <Avatar
        src="/icons/eth-badge.png"
        alt="ETH"
        sx={{
          position: 'absolute',
          top: 25,
          right: 20,
          width:45,
          height: 45,
        }}
      />
      <CardContent sx={{ height: '135px' }}>
        <Typography variant="body2">{chain}</Typography>
        {isConnected && provider.accounts.map(account => (
          <Grid container justifyContent="space-between" alignItems="center" key={account}>
            <Typography variant="body2">{truncateAddress(account)}</Typography>
            <Button
                size="small"
                onClick={() => navigator.clipboard.writeText(account)}
                startIcon={<LinkIcon />}
              >
                Copy
              </Button>
          </Grid>
        ))}
      </CardContent>
      <CardActionArea sx={{ height: '60px' }}>
      <ConnectButton
          provider={provider}
          isConnecting={isConnecting}
          isConnected={isConnected}
          setIsConnecting={setIsConnecting}
          connectProvider={connectProvider}
        />
      </CardActionArea>
    </Card>
  );
};

export default WalletEVM;
