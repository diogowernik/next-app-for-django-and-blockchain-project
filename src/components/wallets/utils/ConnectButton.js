import React from 'react';
import { Button, useTheme } from '@mui/material';
import { Link as LinkIcon, CheckCircle as ConnectedIcon, Sync as ConnectingIcon } from '@mui/icons-material';

const ConnectButton = ({ provider, isConnecting, isConnected, setIsConnecting, connectProvider }) => {
  const theme = useTheme();

  const getButtonProps = () => {
    if (!provider) {
      return { color: 'error', icon: <LinkIcon />, label: "No Provider" };
    } else if (isConnecting) {
      return { color: 'connecting', icon: <ConnectingIcon />, label: "Connecting..." };
    } else if (isConnected) {
      return { color: 'connected', icon: <ConnectedIcon />, label: "Connected" };
    } else {
      return { color: 'primary', icon: <LinkIcon />, label: "Connect" };
    }
  };

  const { color, icon, label } = getButtonProps();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setIsConnecting(true);
        connectProvider().finally(() => setIsConnecting(false));
      }}
      sx={{ borderColor: theme.palette[color].main, color: theme.palette[color].main }}
      startIcon={icon}
    >
      {label}
    </Button>
  );
};

export default ConnectButton;
