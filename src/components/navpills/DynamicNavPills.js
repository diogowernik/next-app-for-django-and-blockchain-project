import React from 'react';
import { Button, Stack, useTheme, useMediaQuery } from '@mui/material';

export const DynamicNavPills = ({
    items,
    handleFilterUpdate, // Atualiza filtros internos
    clearFilters, // Limpa filtros internos
    filters, // Filtros internos
    filterKey,
    handleUrlFilterChange, // Prop adicional para atualizar a URL
    urlFilters // Prop adicional para estados de filtros da URL
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const calculateMinWidth = (text) => {
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
            <Button 
                onClick={() => {
                    clearFilters(); // Limpa filtros internos
                    handleUrlFilterChange(filterKey, ''); // Limpa filtro na URL
                }}
                sx={{
                    flex: 'none',
                    whiteSpace: 'nowrap',
                    minWidth: `${calculateMinWidth('All')}px`,
                    padding: '6px 6px',
                }}
                variant={(filters[filterKey] === '' && (urlFilters && urlFilters[filterKey] === '')) ? "contained" : "outlined"}
            >
                All
            </Button>
            {items.map(item => (
                <Button 
                    key={item} 
                    variant={(filters[filterKey] === item && (urlFilters && urlFilters[filterKey] === item)) ? "contained" : "outlined"}
                    onClick={() => {
                        handleFilterUpdate(filterKey, item); // Atualiza filtro interno
                        handleUrlFilterChange(filterKey, item); // Atualiza filtro na URL
                    }}
                    sx={{
                        flex: 'none',
                        whiteSpace: 'nowrap',
                        minWidth: `${calculateMinWidth(item)}px`,
                        padding: '6px 6px',
                    }}
                >
                    {item}
                </Button>
            ))}
        </Stack>
    );
};
