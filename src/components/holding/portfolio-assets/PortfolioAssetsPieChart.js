

import React from 'react';
import { usePieChartData } from '@/hooks/data/usePieChartData';

export const PortfolioAssetsPieChart = ({ assets, categoryFilter }) => {
  const pieDataByCategory = usePieChartData(assets, 'category', 'total_today_brl');
  const pieDataBySubcategory = usePieChartData(assets, 'subcategory', 'total_today_brl');

  // Determina qual conjunto de dados usar com base no filtro de categoria
  const pieData = categoryFilter === '' ? pieDataByCategory : pieDataBySubcategory;

  return (
    <PieChartComponent data={pieData} />
  );
};

