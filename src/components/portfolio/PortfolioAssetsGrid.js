import { Box, Grid } from '@mui/material';
import { PortfolioAssetsColumns } from './PortfolioAssetsColumns';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';
import { useGridManagement, useDynamicFilters, useDeleteAction } from '@/hooks';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { PortfolioAssetsManager } from './PortfolioAssetsManager';

export const PortfolioAssetsGrid = () => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error, categories, brokers } = usePortfolio();
    const { filteredAssets, filters, setFilter, clearFilters, clearFilterByKey } = useDynamicFilters(portfolioAssets, { category: '', broker: '' });

    const { handleProcessRowUpdate, handleDeleteAsset } = useGridManagement(djangoToken, setPortfolioAssets);
    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction(handleDeleteAsset);
    const columns = PortfolioAssetsColumns(handleDialogOpen);

    const addAsset = () => {
        // Pode abrir um modal aqui para adicionar novos ativos
        // ou chamar diretamente addPortfolioAsset(data, djangoToken);
    };

    return (
        <Box sx={{ display: 'flex', height: 700 }}>
            <Grid container>
                <LeftSidebar />
                <PortfolioAssetsManager
                    addAsset={addAsset}
                    filters={filters}
                    setFilters={setFilter} // Aqui, use setFilter em vez de setFilters
                    loading={loading}
                    error={error}
                    filteredAssets={filteredAssets}
                    columns={columns}
                    handleProcessRowUpdate={handleProcessRowUpdate}
                    renderDeleteDialog={renderDeleteDialog}
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

