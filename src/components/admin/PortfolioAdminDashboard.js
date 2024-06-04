import React from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { DynamicFilters } from '@/utils/grid/DynamicFilters';
import {PortfolioAssetModalButton} from '@/components/portfolios/PortfolioAssetModalButton';

export const PortfolioAssetsGrid = ({
  filters, setFilters, loading, error, filteredAssets, columns, handleProcessRowUpdate, renderDeleteDialog, djangoToken, addAssetToGrid
}) => {
  return (
    <Grid item xs={12} md={8} ml={2} mr={2}>
      <DynamicFilters filters={filters} setFilters={setFilters} />
      <PortfolioAssetModalButton djangoToken={djangoToken} addAssetToGrid={addAssetToGrid} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>Error loading assets: {error}</p>
      ) : (
        // <Box sx={{ width: '100%', maxWidth: '100%' }}>
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
        // </Box>
      )}
      {renderDeleteDialog()}
    </Grid>
  );
};
