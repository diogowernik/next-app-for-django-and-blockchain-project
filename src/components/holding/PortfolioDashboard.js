import React from 'react';
import { Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { PortfolioAssetModalButton } from './portfolio-assets/PortfolioAssetModalButton';
import { PortfolioAssetsPieChart } from './portfolio-assets/PortfolioAssetsPieChart';
import { PortfolioAssetsTreemap } from './portfolio-assets/PortfolioAssetsTreemap';
import { CategoryNavPills } from './CategoryNavPills';

export const PortfolioDashboard = ({
  filters, setFilters, loading, error, filteredAssets, columns, handleProcessRowUpdate, renderDeleteDialog, djangoToken, addAssetToGrid, categories, clearFilterByKey
}) => {
  return (
    // xs={12} md={9} ml={2} mr={2} é muito importante para o layout, principalmente para funcionar com o lefsidebar no componente pai. Não remover nem alterar.
    <Grid container spacing={2} item xs={12} md={9} ml={2} mr={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '550px' }}>
          <CardContent>
            <PortfolioAssetsPieChart assets={filteredAssets} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '550px' }}>
          <CardContent>
          </CardContent>
        </Card>
      </Grid>
            <Grid item xs={12}>
        <Card>
          <CardContent>
            <PortfolioAssetModalButton djangoToken={djangoToken} addAssetToGrid={addAssetToGrid} />
            <CategoryNavPills
              categories={categories}
              filters={filters}
              handleFilterUpdate={setFilters}
              clearCategoryFilters={() => clearFilterByKey('category')}
              />
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <p>Error loading assets: {error}</p>
            ) : (
              <DataGrid
                rows={filteredAssets}
                columns={columns}
                autoWidth={true}
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
              <PortfolioAssetsTreemap assets={filteredAssets} />
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
};
