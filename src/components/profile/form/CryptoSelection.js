import React from 'react';
import { Switch, Avatar, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const CryptoItem = styled('div')(({ theme }) => ({
    width: '100%', // Uso total da largura disponível
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1, 0),
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    '&:hover': {
        boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
    },
}));

const CryptoSelection = ({ crypto, icon, selected, onToggle }) => (
    <CryptoItem>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Tooltip title={crypto} placement="left" arrow>
                <Avatar src={`${icon}`} alt={crypto} style={{ marginRight: 8, width: 40, height: 40 }} />
            </Tooltip>
            <Typography variant="body1" style={{ flexGrow: 1 }}>
                {crypto}
            </Typography>
        </div>
        <Switch
            checked={selected}
            onChange={onToggle}
            color="primary"
        />
    </CryptoItem>
);

export default CryptoSelection;
