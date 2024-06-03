import React, { useState, useEffect } from 'react';
import { Card, CardContent, CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

import { usePortfolio } from '@/context/PortfolioContext';
import { useAuth } from '@/context/AuthContext';

import { useGridManagement } from '@/hooks/grid/useGridManagement';
import { useDeleteAction } from '@/hooks/grid/useDeleteAction';
import { useDynamicGridHeight } from '@/hooks/grid/useDynamicGridHeight';
import { DeleteCellComponent } from '@/utils/grid/DeleteCellComponent';

function PortfolioAssetsColumns(handleDialogOpen) {
    return [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 68 },
        { field: 'ticker', headerName: 'Ticker', flex: 1.5, minWidth: 120, editable: false },
        { field: 'shares_amount', headerName: 'Quantidade', flex: 1.5, minWidth: 130, editable: true },
        { field: 'share_average_price_brl', headerName: 'PM BRL', flex: 1.5, minWidth: 130, editable: true },
        { field: 'share_average_price_usd', headerName: 'PM USD', flex: 1.5, minWidth: 130, editable: true },
        { field: 'category', headerName: 'Categoria', flex: 2, minWidth: 180, editable: false },
        { field: 'broker', headerName: 'Corretora', flex: 1.5, minWidth: 130, editable: false },
        { field: 'delete', headerName: 'Deletar', flex: 1, minWidth: 68, renderCell: (params) => (
            <DeleteCellComponent handleDialogOpen={handleDialogOpen} id={params.id} />
        )}
    ];
}

export const PortfolioAssetsGrid = ({ filteredAssets }) => {

    const { djangoToken } = useAuth();
    const { setPortfolioAssets, loading, error } = usePortfolio();
    const { handleProcessRowUpdate, handleDeleteAsset } = useGridManagement(djangoToken, setPortfolioAssets);
    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction(handleDeleteAsset);
    const columns = PortfolioAssetsColumns(handleDialogOpen);
    const gridHeight = useDynamicGridHeight(filteredAssets);


    return (
        <Card>
            <CardContent>
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
                            height: gridHeight,  // Usa a altura dinâmica ajustada
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]
                            }
                        }}
                    />
                )}
                {renderDeleteDialog()}
            </CardContent>
        </Card>
    );
};