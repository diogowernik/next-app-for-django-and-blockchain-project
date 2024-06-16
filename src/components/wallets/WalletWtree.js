import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, Avatar, Paper, CardContent, CardActions } from "@mui/material";
import { styled } from '@mui/material/styles';
import { AccountBalanceWallet as WalletIcon, Link as LinkIcon } from "@mui/icons-material";
import { truncateAddress } from "./utils/functions";
import { WtreeIcon } from '@/components/dex/ui/WtreeIcon';
import { useTheme } from "@emotion/react";

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

// Componente WalletWtree
const WalletWtree = (props) => {
    const theme = useTheme();

  const { provider } = props;

  const isConnected = !!provider.accounts.length;

  return (
    <StyledPaper elevation={3}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            {/* <Avatar
              src={provider.info.icon || ""}
              alt={provider.info.name}
              sx={{ width: 42, height: 48, borderRadius: 0, objectFit: 'contain' }}
            >
              {!provider.info.icon && <WalletIcon />}
            </Avatar> */}
            <WtreeIcon color={theme.palette.primary.main} width="100px" />

          </Grid>
          <Grid item xs>
            <Typography variant="h6">{provider.info.name}</Typography>
            {provider.info.rdns && (
              <Typography variant="body2" color="textSecondary">
                RDNS: {provider.info.rdns}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary">Testnet</Typography>
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
            </Grid>
          ))}
        </CardContent>
      )}
      <CardActions>
        <Button disabled variant="contained" color="success">
          Connected
        </Button>
      </CardActions>
    </StyledPaper>
  );
};

export default WalletWtree;
