import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { DividendsDashboard } from '@/components/holding/DividendsDashboard';


export const DividendsByYear = () => {
  const { dividends, dividends_by_year } = usePortfolio();

  return <DividendsDashboard 
            filterKey="pay_date_by_year" 
            items={dividends_by_year}
            dividends={dividends}
          />;
};
