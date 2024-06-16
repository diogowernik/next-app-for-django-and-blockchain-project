import React from 'react';
import { HoldingDashboard } from '@/components/holding/HoldingDashboard';
import { usePortfolio } from '@/context/PortfolioContext';


export const CategoryDashboard = () => {
  const { portfolioAssets, categories } = usePortfolio();


  return <HoldingDashboard 
            filterKey="category" 
            items={categories}
            portfolioAssets={portfolioAssets}
          />;
};
