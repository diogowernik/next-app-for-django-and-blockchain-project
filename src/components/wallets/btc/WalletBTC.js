import React from "react";
import { Card, CardContent, CardHeader, Typography, Avatar, Grid, CardActionArea, Button} from "@mui/material";
import { Link as LinkIcon, AccountBalanceWallet as WalletIcon} from "@mui/icons-material";
import { truncateAddress } from "@/components/wallets/utils/functions";
import useWalletBTC from "@/components/wallets/btc/useWalletBTC";
import ConnectButton from "@/components/wallets/utils/ConnectButton";

const WalletBTC = (props) => {
  const { connectProvider, provider, modifyProviders } = props;
  const { chain, isConnecting, isConnected, setIsConnecting } = useWalletBTC(provider, modifyProviders);

  return (
    <Card sx={{ height: '280px', position: 'relative' }}>
      <CardHeader
        avatar={
          <Avatar src={provider.info.icon || ""} alt={provider.info.name} sx={{ width: 42, height: 48, borderRadius: 0, objectFit: 'contain' }}>
          </Avatar>
        }
        title={
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            {provider.info.name}
          </Typography>
        }
        subheader={provider.info.rdns && <Typography variant="body2">{`RDNS: ${provider.info.rdns}`}</Typography>}
      />
      <Avatar
        src="/icons/btc.png" // Ajuste o caminho se necessário
        alt="BTC"
        sx={{
          position: 'absolute',
          top: 25,
          right: 20,
          width: 30,
          height: 30,
        }}
      />
      <CardContent sx={{ height: '135px' }}>
        <Typography variant="body2">{chain}</Typography>
        {isConnected && provider.accounts.map((account, index) => (
          <Grid container justifyContent="space-between" alignItems="center" key={index}>
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

export default WalletBTC;
