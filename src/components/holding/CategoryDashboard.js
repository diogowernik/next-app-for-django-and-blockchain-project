import React from 'react';
import { MainDashboardComponent } from '@/components/dashboard/MainDashboardComponent';
import { usePortfolio } from '@/context/PortfolioContext';


export const CategoryDashboard = () => {
  const { portfolioAssets, categories } = usePortfolio();


  return <MainDashboardComponent 
            filterKey="category" 
            items={categories}
            portfolioAssets={portfolioAssets}
          />;
};
