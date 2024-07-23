import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import useStakedChart from '@/hooks/data/useStakedChart';
import StakedComponent from '@/components/charts/StakedComponent';

const DividendsStakedChart = ({ assets, Filter }) => {
  const chartData = Filter === ''
    ? useStakedChart(assets, 'category')
    : useStakedChart(assets, 'ticker');

  const title = `Gráfico de Dividendos Mensais por ${Filter === '' ? 'Categoria' : 'Ticker'}`;

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
            {title}
          </Typography>
        }
      />
      <CardContent>
        <StakedComponent chartData={chartData} />
      </CardContent>
    </Card>
  );
};

export default DividendsStakedChart;
