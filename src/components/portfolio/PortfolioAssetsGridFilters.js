// @/components/portfolio/PortfolioAssetsGrid.js

import React from 'react';
import { CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { getColumns as PortfolioAssetsColumns } from './PortfolioAssetsColumns';
import { DynamicFilters } from '@/utils/grid/DynamicFilters';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext'; // Import usePortfolio
import { useGridManagement, useDynamicFilters, useDeleteAction } from '@/hooks'; 

const PortfolioAssetsGrid = () => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error } = usePortfolio(); // Use data from context
    const { filteredAssets, filters, setFilters } = useDynamicFilters(portfolioAssets, { category: '', broker: '' });

    const { handleProcessRowUpdate, handleDeleteAsset } = useGridManagement(djangoToken, setPortfolioAssets);
    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction(handleDeleteAsset);
    const columns = PortfolioAssetsColumns(handleDialogOpen);

    return (
        <>
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
        </>
    );
};

export default PortfolioAssetsGrid;
