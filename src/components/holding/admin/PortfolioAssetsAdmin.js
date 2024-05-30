import { Box, Grid } from '@mui/material';

import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';

import { useGridManagement, useDynamicFilters, useDeleteAction } from '@/hooks';

import { LeftSidebar } from '@/layouts/portfolio/LeftSidebar';
import { RightSidebar } from '@/layouts/portfolio/RightSidebar';

import { PortfolioAssetsColumns } from '@/components/holding/portfolio-assets/PortfolioAssetsColumns';
import { PortfolioAssetsGrid } from '@/components/holding/portfolio-assets/PortfolioAssetsGrid';

export const PortfolioAssetsAdmin = () => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error, categories, brokers } = usePortfolio();
    const { filteredAssets, filters, setFilter, clearFilters, clearFilterByKey, addAsset } = useDynamicFilters(portfolioAssets, { category: '', broker: '' });

    const { handleProcessRowUpdate, handleDeleteAsset } = useGridManagement(djangoToken, setPortfolioAssets);
    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction(handleDeleteAsset);
    const columns = PortfolioAssetsColumns(handleDialogOpen);

    return (
        <Box sx={{ display: 'flex', height: 700 }}>
            <Grid container>
                <LeftSidebar /> 
                <PortfolioAssetsGrid
                    djangoToken={djangoToken}
                    filters={filters}
                    setFilters={setFilter} // Use setFilter em vez de setFilters
                    loading={loading}
                    error={error}
                    filteredAssets={filteredAssets}
                    columns={columns}
                    handleProcessRowUpdate={handleProcessRowUpdate}
                    renderDeleteDialog={renderDeleteDialog}
                    addAssetToGrid={addAsset}  // Adicionando a função addAsset como addAssetToGrid
                />
                <RightSidebar
                    brokers={brokers}
                    categories={categories}
                    handleFilterUpdate={setFilter}
                    clearAllFilters={clearFilters}
                    clearBrokerFilters={() => clearFilterByKey('broker')}
                    clearCategoryFilters={() => clearFilterByKey('category')}
                    filters={filters}
                />
            </Grid>
        </Box>
    );
};
