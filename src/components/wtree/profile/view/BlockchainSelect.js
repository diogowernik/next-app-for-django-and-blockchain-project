import React from 'react';
import { Select, MenuItem } from '@mui/material';

export const BlockchainSelect = ({ selectedBlockchain, setSelectedBlockchain, acceptedCryptos }) => {
    return (
        <Select
            size='small'
            value={selectedBlockchain}
            onChange={e => setSelectedBlockchain(e.target.value)}
            sx={{ marginX: 3, marginBottom: 2, width: '85%' }}
        >
            {acceptedCryptos.map(blockchain => (
                <MenuItem key={blockchain} value={blockchain}>{blockchain}</MenuItem>
            ))}
        </Select>
    );
};
