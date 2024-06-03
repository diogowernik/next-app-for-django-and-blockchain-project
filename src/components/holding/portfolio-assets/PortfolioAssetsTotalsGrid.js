import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTotalGridData } from '@/hooks/data/useTotalGridData';
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Typography, CardActionArea, Button } from '@mui/material';

export const PortfolioAssetsTotalsGrid = ({ assets, categoryFilter }) => {
    const theme = useTheme();

    const portfolioDatabyCategory = useTotalGridData(assets, 'category', 'total_today_brl');
    const portfolioDatabySubCategory = useTotalGridData(assets, 'subcategory', 'total_today_brl');

    const portfolioData = categoryFilter === '' ? portfolioDatabyCategory : portfolioDatabySubCategory;
  
    const columns = [
      { 
        field: 'name', 
        headerName: 'Name', 
        flex: 5, 
        renderCell: (params) => (
          <div style={{ textAlign: 'left', fontSize: '1.1em' }}>
            {params.value}
          </div>
        ) 
      },
      { 
        field: 'total', 
        headerName: 'Total', 
        flex: 1.6, 
        type: 'number', 
        renderCell: (params) => (
          <div style={{ textAlign: 'right', color: theme.palette.secondary.dark, fontSize: '1.05em', fontWeight: 400 }}>
            {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(params.value)}
          </div>
        ) 
      },
      { 
        field: 'porcentagem', 
        headerName: 'Porcentagem', 
        flex: 1, 
        renderCell: (params) => (
          <div style={{ textAlign: 'right', color: 'grey', fontSize: '0.9em', fontWeight: 'normal' }}>
            ({params.value})
          </div>
        ) 
      }
    ];
    
    return (
      <Card sx={{ height: '480px', border: '1px solid #e0e0e0' }}>
        <CardHeader
          title={
            <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
              Asset Overview
            </Typography>
          }
          sx={{
            backgroundColor: '#f5f5f5',
            color: '#2E8B57',
            borderBottom: '1px solid #e0e0e0'
          }}
        />
        <CardContent sx={{
            color: '#424242', // Cor do texto ajustada, considerando o design elegante
            backgroundColor: '#eceff1', // Cor de fundo para o conteúdo
        }}>
          <TotalGrid data={portfolioData} columns={columns} autoHeight />
        </CardContent>
        <CardActionArea sx={{
            justifyContent: 'flex-end', // Alinha os botões para a direita
            backgroundColor: '#f5f5f5', // Cor de fundo para o footer
            borderTop: '1px solid #e0e0e0', // Linha na parte superior do footer
            padding: theme.spacing(1), // Uso de padding com base no tema
        }}>
        </CardActionArea>
      </Card>
    );
  };

export const TotalGrid = ({ data, columns }) => {
    return (

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5} // Você pode remover essa linha se quiser mostrar todos os dados sem paginação
          hideFooterPagination={true} // Esconde a paginação
          hideFooter={true} // Esconde o rodapé inteiro
          rowHeight={40} // Define a altura das linhas
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              display: 'none', // Esconde o cabeçalho
            },
            '& .MuiDataGrid-footerContainer': {
              display: 'none', // Esconde a barra de paginação e outros elementos no rodapé
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'transparent', // Remove o efeito de hover
            },
            border: 'none', // Remove a borda do grid
          }}
        />
      </div>

    );
  };
  

