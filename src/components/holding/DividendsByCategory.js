import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { DividendsDashboard } from '@/components/holding/DividendsDashboard';

export const DividendsByCategory = () => {
  const { dividends, categoryDividends, yearlyDividends } = usePortfolio();

  return (
    <DividendsDashboard 
      filterKey="pay_date_by_month_year" 
      items={categoryDividends}
      dividends={dividends}
      yearlyDividends={yearlyDividends} 
    />
  );
};
