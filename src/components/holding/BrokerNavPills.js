import React from 'react';
import { Button, Stack, useTheme, useMediaQuery } from '@mui/material';

export const BrokerNavPills = ({ brokers, handleFilterUpdate, clearBrokerFilters, filters }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Função para calcular o minWidth com base no comprimento do texto
    const calculateMinWidth = (text) => {
        // Base mínima para textos curtos + aumento proporcional ao comprimento do texto
        return Math.max(100, 8 * text.length);
    };

    return (
        <Stack 
            direction="row"
            spacing={2}
            sx={{
                mb: 2,
                overflowX: 'auto',
                p: isMobile ? 1 : 2,
                '&::-webkit-scrollbar': {
                    height: '4px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '20px'
                },
            }}
        >
            {/* Botão "All" com minWidth calculado dinamicamente */}
            <Button 
                onClick={clearBrokerFilters} 
                sx={{
                    flex: 'none',
                    whiteSpace: 'nowrap',
                    minWidth: `${calculateMinWidth('All')}px`,  // Dinamicamente calculado para 'All'
                    padding: '6px 6px',
                }}
                variant={filters.broker === '' ? "contained" : "outlined"}
            >
                All
            </Button>
            {brokers.map(broker => (
                <Button 
                    key={broker} 
                    variant={filters.broker === broker ? "contained" : "outlined"}
                    onClick={() => handleFilterUpdate('broker', broker)}
                    sx={{
                        flex: 'none',
                        whiteSpace: 'nowrap',
                        minWidth: `${calculateMinWidth(broker)}px`,  // Dinamicamente calculado
                        padding: '6px 6px',
                    }}
                >
                    {broker}
                </Button>
            ))}
        </Stack>
    );
};
