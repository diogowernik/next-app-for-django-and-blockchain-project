import React from 'react';
import { Button, Stack, useTheme, useMediaQuery } from '@mui/material';

export const CategoryNavPills = ({ categories, handleFilterUpdate, clearCategoryFilters, filters }) => {
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
                onClick={clearCategoryFilters} 
                sx={{
                    flex: 'none',
                    whiteSpace: 'nowrap',
                    minWidth: `${calculateMinWidth('All')}px`,  // Dinamicamente calculado para 'All'
                    padding: '6px 12px',
                }}
                variant={filters.category === '' ? "contained" : "outlined"}
            >
                All
            </Button>
            {categories.map(category => (
                <Button 
                    key={category} 
                    variant={filters.category === category ? "contained" : "outlined"}
                    onClick={() => handleFilterUpdate('category', category)}
                    sx={{
                        flex: 'none',
                        whiteSpace: 'nowrap',
                        minWidth: `${calculateMinWidth(category)}px`,  // Dinamicamente calculado
                        padding: '6px 12px',
                    }}
                >
                    {category}
                </Button>
            ))}
        </Stack>
    );
};
