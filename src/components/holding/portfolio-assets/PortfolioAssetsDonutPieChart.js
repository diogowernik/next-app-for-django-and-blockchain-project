import React from 'react';
import { useDonutChartData } from '@/hooks/data/useDonutChartData';
import { usePieChartData } from '@/hooks/data/usePieChartData';
import { DonutChartComponent } from '@/components/charts/DonutChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent'; // Ensure this is imported correctly

export const PortfolioAssetsDonutPieChart = ({ assets, categoryFilter }) => {
  const donutData = useDonutChartData(assets, 'category', 'total_today_brl');
  const pieData = usePieChartData(assets, 'subcategory', 'total_today_brl');

  // Determine which chart to render based on the category filter
  const isCategoryFilter = categoryFilter === '';
  
  return (
    <>
      {isCategoryFilter ? (
        <DonutChartComponent data={donutData} />
      ) : (
        <PieChartComponent data={pieData} />
      )}
    </>
  );
};
