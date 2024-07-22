import React from 'react';
import { CircularProgress } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

import { usePortfolio } from '@/context/PortfolioContext';
import { useAuth } from '@/context/AuthContext';

import { useGridManagement } from '@/hooks/grid/useGridManagement';
import { useDeleteAction } from '@/hooks/grid/useDeleteAction';
import { useDynamicGridHeight } from '@/hooks/grid/useDynamicGridHeight';
import { DeleteCellComponent } from '@/utils/grid/DeleteCellComponent';

function DividendsColumns(handleDialogOpen) {
    return [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 68 },
        { field: 'ticker', headerName: 'Ticker', flex: 1.5, minWidth: 120, editable: false },
        { field: 'shares_amount', headerName: 'Quantidade', flex: 1.5, minWidth: 130, editable: true },
        { field: 'value_per_share_brl', headerName: 'Valor por Ação BRL', flex: 1.5, minWidth: 130, editable: true },
        { field: 'value_per_share_usd', headerName: 'Valor por Ação USD', flex: 1.5, minWidth: 130, editable: true },
        { field: 'total_dividend_brl', headerName: 'Total BRL', flex: 1.5, minWidth: 130, editable: true },
        { field: 'total_dividend_usd', headerName: 'Total USD', flex: 1.5, minWidth: 130, editable: true },
        { field: 'pay_date', headerName: 'Data de Pagamento', flex: 1.5, minWidth: 130, editable: true },
        { field: 'category', headerName: 'Categoria', flex: 2, minWidth: 180, editable: false },
        { field: 'pay_date_by_month_year', headerName: 'Mês/Ano', flex: 1.5, minWidth: 130, editable: false },
        { field: 'pay_date_by_year', headerName: 'Ano', flex: 1.5, minWidth: 130, editable: false },
        { field: 'delete', headerName: 'Deletar', flex: 1, minWidth: 68, renderCell: (params) => (
            <DeleteCellComponent handleDialogOpen={handleDialogOpen} id={params.id} />
        )}
    ];
}

export const DividendsGrid = ({ filteredAssets }) => {

    const { djangoToken } = useAuth();
    const { setDividends, loading, error } = usePortfolio();
    const { handleProcessRowUpdate, handleDeleteAsset } = useGridManagement(djangoToken, setDividends);
    const { handleDialogOpen, renderDeleteDialog } = useDeleteAction(handleDeleteAsset);
    const columns = DividendsColumns(handleDialogOpen);
    const gridHeight = useDynamicGridHeight(filteredAssets);


    return (

            <>
                
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
            </>
    );
};