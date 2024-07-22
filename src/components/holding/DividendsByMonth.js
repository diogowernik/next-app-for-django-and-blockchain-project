import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { DividendsDashboard } from '@/components/holding/DividendsDashboard';

export const DividendsByMonth = () => {
  const { dividends, monthlyDividends, yearlyDividends } = usePortfolio();

  return (
    <DividendsDashboard 
      filterKey="pay_date_by_month_year" 
      items={monthlyDividends}
      dividends={dividends}
      yearlyDividends={yearlyDividends} 
    />
  );
};
