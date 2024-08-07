import React from 'react';

import { useDonutChartData } from '@/hooks/data/useDonutChartData';
import { usePieChartData } from '@/hooks/data/usePieChartData';

import { DonutChartComponent } from '@/components/charts/DonutChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent';

import { CardHeader, CardContent, Typography, Card } from '@mui/material';

export const DividendsDonutPieChart = ({ assets, filterKey, Filter }) => {
  const donutData = useDonutChartData(assets, 'category', 'total_dividend_brl');

  // Decidindo a chave para usar no pieData baseada no filterKey atual
  const pieDataKey = filterKey === 'pay_date_by_year' ? 'category' : 'category';
  const pieData = usePieChartData(assets, pieDataKey, 'total_dividend_brl');

  // Determine which chart to render based on the Filter property
  const isFilterEmpty = Filter === '';

  return (
      <Card sx={{ height: '520px' }}>
        <CardHeader
          title={
            <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
              Pie Charts
            </Typography>
          }
        />
        <CardContent>
          {isFilterEmpty ? (
            <DonutChartComponent data={donutData} />
          ) : (
            <PieChartComponent data={pieData} />
          )}
        </CardContent>
      </Card>
  );
};
