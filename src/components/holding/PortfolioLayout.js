import React, { useState, useEffect, use } from 'react';
import { Box, Grid } from '@mui/material';

import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';

import { useGridManagement, useDynamicFilters, useDeleteAction } from '@/hooks';
import usePersistentToggle from '@/hooks/sidebars/usePersistentToggle';

import { PortfolioAssetsColumns } from '@/components/holding/portfolio-assets/PortfolioAssetsColumns';
import  { PortfolioDashboard } from '@/components/holding/PortfolioDashboard';

import { Navbar } from '@/layouts/holding/portfolio/Navbar';
import { LeftSidebar } from '@/layouts/holding/portfolio/LeftSidebar';


export const PortfolioLayout = () => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error, categories } = usePortfolio();
    const { filteredAssets, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(portfolioAssets, { category: '' });

    const { handleProcessRowUpdate, handleDeleteAsset } = useGridManagement(djangoToken, setPortfolioAssets);
    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction(handleDeleteAsset);
    const columns = PortfolioAssetsColumns(handleDialogOpen);

    // Initialize state with localStorage or default to false
    const [leftSidebarOpen, toggleLeftSidebar] = usePersistentToggle('leftSidebarOpen', false);

    return (
        <Box sx={{ display: 'flex', height: 700 }}>
            <Navbar />
            <Grid container sx={{ mt: 5 }}>
                <LeftSidebar 
                    isOpen={leftSidebarOpen}
                    toggleSidebar={toggleLeftSidebar} 
                />
                <PortfolioDashboard
                    djangoToken={djangoToken}
                    filters={filters}
                    setFilters={setCallbackFilters}
                    loading={loading}
                    error={error}
                    filteredAssets={filteredAssets}
                    columns={columns}
                    handleProcessRowUpdate={handleProcessRowUpdate}
                    renderDeleteDialog={renderDeleteDialog}
                    addAssetToGrid={addAsset}
                    categories={categories}
                    clearFilterByKey={clearFilterByKey}

                />
            </Grid>
        </Box>
    );
};

