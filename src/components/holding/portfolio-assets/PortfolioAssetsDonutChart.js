import React from 'react';
import { DonutChartComponent } from '@/components/charts/DonutChartComponent';
import { useDonutChartData } from '@/hooks/data/useDonutChartData';

export const PortfolioAssetsDonutChart = ({ assets }) => {
  const donutChartData = useDonutChartData(assets, 'category', 'total_today_brl');

  return (
    <DonutChartComponent data={donutChartData} />
  );
};
  