import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Função para formatar números como moeda, sem o símbolo da moeda
const formatCurrency = (value) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Função para transformar os dados
const transformData = (assets) => {
    let yearData = {};
    assets.forEach(asset => {
        const year = asset.pay_date_by_year;
        const month = parseInt(asset.pay_date.split('/')[1]) - 1;
        const totalDividend = asset.total_dividend_brl;

        if (!yearData[year]) {
            yearData[year] = { year: year, months: Array(12).fill(0), total: 0, average: 0 };
        }

        yearData[year].months[month] += totalDividend;
        yearData[year].total += totalDividend;
    });

    Object.keys(yearData).forEach(year => {
        yearData[year].average = yearData[year].total / 12;
    });

    return Object.values(yearData).sort((a, b) => a.year - b.year);
}

// Estilos personalizados usando `styled`
const StyledTable = styled(Table)({
    minWidth: 650,
});

const StyledTableCell = styled(TableCell)({
    padding: '8px',
});

const HeaderCell = styled(StyledTableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    color: '#000',
});

const TitleTypography = styled(Typography)({
    fontWeight: '500',
    fontFamily: '"Roboto Condensed", sans-serif',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9',
    },
}));

const DividendsOverviewTable = ({ assets, filterKey }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const transformedData = transformData(assets);
        setData(transformedData);
    }, [assets]);

    return (
        <Card>
            <CardHeader
                title={
                    <TitleTypography variant="h6" component="div">
                        Visão geral dos Dividendos
                    </TitleTypography>
                }
            />
            <CardContent>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <HeaderCell>Ano</HeaderCell>
                                {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Média', 'Total'].map(month => ( 
                                    <HeaderCell key={month}>{month}</HeaderCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((yearData) => (
                                <StyledTableRow key={yearData.year}>
                                    <StyledTableCell>{yearData.year}</StyledTableCell>
                                    {yearData.months.map((value, idx) => (
                                        <StyledTableCell key={idx}>{formatCurrency(value)}</StyledTableCell>
                                    ))}
                                    <StyledTableCell>{formatCurrency(yearData.average)}</StyledTableCell>
                                    <StyledTableCell>{formatCurrency(yearData.total)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
            </CardContent>
        </Card>
    );
};

export default DividendsOverviewTable;
