import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { DividendsDashboard } from '@/components/holding/DividendsDashboard';


export const DividendsByMonth = () => {
  const { dividends, dividends_by_month } = usePortfolio();

  return <DividendsDashboard 
            filterKey="pay_date_by_month_year" 
            items={dividends_by_month}
            dividends={dividends}
          />;
};
