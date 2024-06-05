import React from 'react';
import { MainDashboardComponent } from '@/components/dashboard/MainDashboardComponent';
import { usePortfolio } from '@/context/PortfolioContext';


export const BrokerDashboard = () => {
  const { portfolioAssets, brokers } = usePortfolio();


  return <MainDashboardComponent 
            filterKey="broker" 
            items={brokers}
            portfolioAssets={portfolioAssets}
          />;
};
