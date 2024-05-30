// @/components/portfolio/PortfolioAssetsManager.js

import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { DynamicFilters } from '@/utils/grid/DynamicFilters';
import {PortfolioAssetModalButton} from './PortfolioAssetModalButton';

export const PortfolioAssetsGrid = ({
  filters, setFilters, loading, error, filteredAssets, columns, handleProcessRowUpdate, renderDeleteDialog, djangoToken, addAssetToGrid
}) => {
  return (
    <Grid item xs={12} md={8} ml={2} mr={2}>
      <DynamicFilters filters={filters} setFilters={setFilters} />
      <PortfolioAssetModalButton 
        djangoToken={djangoToken} 
        addAssetToGrid={addAssetToGrid} // Passando addAssetToGrid como prop
      />
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
