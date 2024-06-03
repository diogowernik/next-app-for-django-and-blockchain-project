import React from 'react';

import { useDonutChartData } from '@/hooks/data/useDonutChartData';
import { usePieChartData } from '@/hooks/data/usePieChartData';

import { DonutChartComponent } from '@/components/charts/DonutChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent'; // Ensure this is imported correctly

import { CardHeader, CardContent, Typography, CardActionArea, Card } from '@mui/material';

export const PortfolioAssetsDonutPieChart = ({ assets, categoryFilter }) => {
  const donutData = useDonutChartData(assets, 'category', 'total_today_brl');
  const pieData = usePieChartData(assets, 'subcategory', 'total_today_brl');

  // Determine which chart to render based on the category filter
  const isCategoryFilter = categoryFilter === '';

  return (
      <Card sx={{ height: '520px'}}>
        <CardHeader
          title={
            <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
              Asset Overview
            </Typography>
          }
        />
        <CardContent>
      {isCategoryFilter ? (
        <DonutChartComponent data={donutData} />
      ) : (
        <PieChartComponent data={pieData} />
      )}
        </CardContent>
    </Card>
      
  );
};
