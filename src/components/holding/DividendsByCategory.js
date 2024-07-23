import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { DividendsDashboard } from '@/components/holding/DividendsDashboard';


export const DividendsByCategory = () => {
  const { dividends, dividends_by_category } = usePortfolio();

  return <DividendsDashboard 
            filterKey="category" 
            items={dividends_by_category}
            dividends={dividends}
          />;
};
