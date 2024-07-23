import React from 'react';
import { CircularProgress, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

const ValuationColumns = () => {
    return [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 68 },
        { field: 'date', headerName: 'Data', flex: 1.5, minWidth: 130, editable: true },
        { field: 'total_brl', headerName: 'Total BRL', flex: 1.5, minWidth: 130, editable: true },
        { field: 'total_usd', headerName: 'Total USD', flex: 1.5, minWidth: 130, editable: true },
        { field: 'quota_amount', headerName: 'Quantidade de Cotas', flex: 1.5, minWidth: 130, editable: true },
        { field: 'quota_price_brl', headerName: 'Preço da Cota BRL', flex: 1.5, minWidth: 130, editable: true },
        { field: 'quota_price_usd', headerName: 'Preço da Cota USD', flex: 1.5, minWidth: 130, editable: true },
        { field: 'percentage_change', headerName: 'Variação %', flex: 1.5, minWidth: 130, editable: false },
    ];
};

const ValuationGrid = ({ assets, loading, error, gridHeight = 400 }) => {
    const columns = ValuationColumns();

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <p>Error loading assets: {error}</p>
            ) : (
                <DataGrid
                    rows={assets}
                    columns={columns}
                    autoWidth={true}
                    getRowId={(row) => row.id}
                    sx={{
                        height: gridHeight,
                        [`& .${gridClasses.row}`]: {
                            bgcolor: (theme) => theme.palette.mode === 'light' ? grey[200] : grey[900]
                        }
                    }}
                />
            )}
        </>
    );
};

export const ValuationDataGrid = ({ valuations, loading, error }) => {
    return (
        <Card>
            <CardHeader
                title={
                    <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
                        Tabela de Valuations
                    </Typography>
                }
            />
            <CardContent>
                <ValuationGrid
                    assets={valuations}
                    loading={loading}
                    error={error}
                />
            </CardContent>
        </Card>
    );
};
