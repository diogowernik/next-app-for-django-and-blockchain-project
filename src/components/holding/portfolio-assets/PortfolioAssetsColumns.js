import React from 'react';
import { DeleteCellComponent } from '@/utils/grid/DeleteCellComponent';

export function PortfolioAssetsColumns(handleDialogOpen) {
    return [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 68 },
        { field: 'ticker', headerName: 'Ticker', flex: 1.5, minWidth: 120, editable: false },
        { field: 'shares_amount', headerName: 'Qnt', flex: 1.5, minWidth: 130, editable: true },
        { field: 'share_average_price_brl', headerName: 'PM Brl', flex: 1.5, minWidth: 130, editable: true },
        { field: 'share_average_price_usd', headerName: 'PM Usd', flex: 1.5, minWidth: 130, editable: true },
        { field: 'category', headerName: 'Categoria', flex: 2, minWidth: 180, editable: false },
        { field: 'broker', headerName: 'Broker', flex: 1.5, minWidth: 130, editable: false },
        { field: 'delete', headerName: 'Delete', flex: 1, minWidth: 68, renderCell: (params) => (
            <DeleteCellComponent handleDialogOpen={handleDialogOpen} id={params.id} />
        )},        
    ];
}
