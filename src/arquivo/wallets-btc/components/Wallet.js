import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, Avatar, Paper, CardContent, CardActions } from "@mui/material";
import { styled } from '@mui/material/styles';
import { AccountBalanceWallet as WalletIcon, Link as LinkIcon } from "@mui/icons-material";
import { truncateAddress } from "../utils/functions";

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

// BTC Wallet component
const Wallet = (props) => {
  const { clickHandler, provider, modifyProviders } = props;

  const [chain, setChain] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const isConnected = !!provider.accounts.length;

  useEffect(() => {
    if (!provider.provider) return;

    const handleAccountsChanged = (accounts) => {
      console.log("accountsChanged", accounts);
      provider.accounts = accounts;
      modifyProviders(provider);
    };

    const handleChainChanged = (network) => {
      console.log("networkChanged", network);
      setChain(network);
    };

    window.addEventListener("accountsChanged", handleAccountsChanged);
    window.addEventListener("chainChanged", handleChainChanged);

    return () => {
      window.removeEventListener("accountsChanged", handleAccountsChanged);
      window.removeEventListener("chainChanged", handleChainChanged);
    };
  }, [provider.provider, provider, modifyProviders]);

  useEffect(() => {
    async function getCurrentChainName() {
      const chain = provider.info.network;
      setChain(chain);
    }
    getCurrentChainName();
    console.log("Connected: ", isConnected);
  }, [provider]);

  return (
    <StyledPaper elevation={3}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              src={provider.info.icon || ""}
              alt={provider.info.name}
              sx={{ width: 42, height: 48, borderRadius: 0, objectFit: 'contain' }}
            >
              {!provider.info.icon && <WalletIcon />}
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
            <Typography variant="body2" color="textSecondary">{chain}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      {isConnected && (
        <CardContent>
          {provider.accounts.map((account, index) => (
            <Grid container justifyContent="space-between" alignItems="center" key={index}>
              <Typography variant="body2">{truncateAddress(account)}</Typography>
              <Button
                size="small"
                onClick={() => navigator.clipboard.writeText(account)}
                startIcon={<LinkIcon />}
              >
                Copy
              </Button>
              <Typography variant="body2" color="textSecondary">
                Public Key: {provider.publicKeys[index]}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                uuid: {provider.info.uuid}
              </Typography>
            </Grid>
          ))}
        </CardContent>
      )}
      <CardActions>
        {isConnecting ? (
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
