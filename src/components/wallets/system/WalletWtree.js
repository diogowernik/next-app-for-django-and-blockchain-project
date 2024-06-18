import React from "react";
import { Card, CardContent, CardHeader, Typography, Grid, Button, useTheme, CardActionArea } from "@mui/material";
import { Link as LinkIcon, CheckCircle as ConnectedIcon } from "@mui/icons-material";
import { truncateAddress } from "../utils/functions";
import { WtreeIcon } from '@/components/dex/ui/WtreeIcon';

const WalletWtree = (props) => {
  const { provider } = props;
  const theme = useTheme();

  const isConnected = !!provider.accounts.length;

  return (
    <Card sx={{ height: '280px', position: 'relative' }}>
      <CardHeader
        avatar={
          <WtreeIcon color={theme.palette.primary.main} width="42px" />
        }
        title={
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            {provider.info.name}
          </Typography>
        }
        subheader={provider.info.rdns && <Typography variant="body2">{`RDNS: ${provider.info.rdns}`}</Typography>}
      />
      <CardContent sx={{ height: '135px' }}>
        <Typography variant="body2">Testnet</Typography>
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
        <Button
          disabled
          variant="outlined"
          sx={{
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
            '&.Mui-disabled': {
              borderColor: theme.palette.success.main,
              color: theme.palette.success.main,
            }
          }}
          startIcon={<ConnectedIcon />}
        >
          Connected
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default WalletWtree;
