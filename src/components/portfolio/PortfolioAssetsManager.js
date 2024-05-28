// @/components/portfolio/PortfolioAssetsManager.js

import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import DynamicFilters from '@/utils/grid/DynamicFilters';

const PortfolioAssetsManager = ({ filters, setFilters, loading, error, filteredAssets, columns, handleProcessRowUpdate, renderDeleteDialog }) => {
    return (
        <Grid item xs={8}>
            <DynamicFilters filters={filters} setFilters={setFilters} />
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <p>Error loading assets: {error}</p>
            ) : (
                <DataGrid
                    rows={filteredAssets}
                    columns={columns}
                    getRowId={(row) => row.id}
                    processRowUpdate={handleProcessRowUpdate}
                    sx={{
                        height: 700,
                        [`& .${gridClasses.row}`]: {
                            bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]
                        }
                    }}
                />
            )}
            {renderDeleteDialog()}
        </Grid>
    );
};

export default PortfolioAssetsManager;
