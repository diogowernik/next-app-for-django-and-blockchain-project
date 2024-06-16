import { chainIDtoName, truncateAddress } from "../utils/functions";
import React, { useEffect, useState } from "react";
import { CardContent, CardActions, Typography, Button, Avatar, Grid, Paper } from "@mui/material";
import { Link as LinkIcon, AccountBalanceWallet as WalletIcon } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: '400px',
  margin: '10px',
  justifyContent: 'space-around',
  boxShadow: theme.shadows[5],
  borderRadius: '20px',
  padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
}));

// EVM Wallet component
const Wallet = (props) => {
  const { clickHandler, provider, modifyProviders } = props;

  const [chain, setChain] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const isConnected = !!provider.accounts.length;

  useEffect(() => {
    if (!provider.provider) return;
    const currentProvider = provider.provider;
    currentProvider.on("accountsChanged", (accounts) => {
      console.log("accountsChanged", accounts);
      provider.accounts = accounts;
      modifyProviders(provider);
    });
    currentProvider.on("chainChanged", async (chainID) => {
      console.log("chainChanged", chainID);
      const chainName = await chainIDtoName(chainID);
      setChain(chainName);
    });
    currentProvider.on("disconnect", (error) => {
      console.log("disconnect", error);
    });
  }, [provider.provider, provider, modifyProviders]);

  useEffect(() => {
    async function getCurrentChainName() {
      if (!provider.provider) return;
      const currentProvider = provider.provider;
      const chainID = await currentProvider.request({
        method: "eth_chainId",
      });
      const chainName = await chainIDtoName(chainID);
      setChain(chainName);
    }
    getCurrentChainName();
    console.log("Connected: ", isConnected);
  }, [provider.provider]);

  return (
    <StyledPaper elevation={3}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              src={provider.info.icon}
              alt={provider.info.name}
              sx={{
                width: 42,
                height: 48,
                borderRadius: 0,
                objectFit: 'contain'
              }}
            >
              {provider.info.icon ? null : <WalletIcon />}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{provider.info.name}</Typography>
            {/* Aqui exibimos o RDNS se disponível */}
            {provider.info.rdns && (
              <Typography variant="body2" color="textSecondary">
                RDNS: {provider.info.rdns}
              </Typography>
            )}
              <Typography variant="body2" color="textSecondary">
                {chain}
              </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {isConnected && (
        <CardContent>
          {provider.accounts.map((account) => (
            <Grid container justifyContent="space-between" alignItems="center" key={account}>
              <Typography variant="body2">
                {truncateAddress(account)}
              </Typography>
              <Button
                size="small"
                onClick={() => navigator.clipboard.writeText(account)}
                startIcon={<LinkIcon />}
              >
                Copy
              </Button>
              <Typography variant="body2" color="textSecondary">
                uuid:  {provider.info.uuid}
              </Typography>
            </Grid>
          ))}
        </CardContent>
      )}
      <CardActions>
        {!provider.provider ? (
          <Button disabled variant="contained" color="error">
            No Provider
          </Button>
        ) : isConnecting ? (
          <Button disabled variant="contained" color="primary">
            Connecting...
          </Button>
        ) : isConnected ? (
          <Button disabled variant="contained" color="success">
            Connected
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsConnecting(true);
              clickHandler().finally(() => {
                setTimeout(() => {
                  setIsConnecting(false);
                }, 500);
              });
            }}
            variant="contained"
            color="primary"
          >
            Connect
          </Button>
        )}
      </CardActions>
    </StyledPaper>
  );
};

export default Wallet;
