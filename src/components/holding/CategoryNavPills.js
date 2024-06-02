import React from 'react';
import { Button, Stack } from '@mui/material';

export const CategoryNavPills = ({ categories, handleFilterUpdate, clearCategoryFilters, filters }) => {
    return (
        <Stack direction="row" spacing={2} sx={{ mb: 2, overflowX: 'auto' }}>
            <Button 
                onClick={clearCategoryFilters} 
                sx={{ flexGrow: 0 }}
                variant={filters.category === '' ? "contained" : "outlined"}
            >
                All
            </Button>
            {categories.map(category => (
                <Button 
                    key={category} 
                    variant={filters.category === category ? "contained" : "outlined"}
                    onClick={() => handleFilterUpdate('category', category)}
                >
                    {category}
                </Button>
            ))}
        </Stack>
    );
};

