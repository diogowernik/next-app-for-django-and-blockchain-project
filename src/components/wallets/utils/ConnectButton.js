import React from 'react';
import { Button, useTheme } from '@mui/material';
import { Link as LinkIcon, CheckCircle as ConnectedIcon, Sync as ConnectingIcon, CircleOutlined as DisconnectedIcon } from '@mui/icons-material';

const ConnectButton = ({ provider, isConnecting, isConnected, setIsConnecting, connectProvider }) => {
    const theme = useTheme();

    const rotateAnimation = {
        '@keyframes rotate': {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            }
        }
    };

    const getButtonProps = () => {
        if (!provider) {
            return { color: 'primary', icon: <DisconnectedIcon sx={{ color: theme.palette.warning.main }} />, label: "No Provider" };
        } else if (isConnecting) {
            return {
                color: 'warning',
                icon: <ConnectingIcon sx={{
                    animation: 'rotate 2s linear infinite',
                    ...rotateAnimation
                }} />,
                label: "Connecting..."
            };
        } else if (isConnected) {
            return { color: 'success', icon: <ConnectedIcon />, label: "Connected" };
        } else {
            return { color: 'primary', icon: <DisconnectedIcon sx={{ color: theme.palette.warning.main }} />, label: "Connect" };
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
