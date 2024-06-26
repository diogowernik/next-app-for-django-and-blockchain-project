import React from 'react';
import { HoldingDashboard } from '@/components/holding/HoldingDashboard';
import { usePortfolio } from '@/context/PortfolioContext';


export const BrokerDashboard = () => {
  const { portfolioAssets, brokers } = usePortfolio();
  console.log(portfolioAssets);


  return <HoldingDashboard 
            filterKey="broker" 
            items={brokers}
            portfolioAssets={portfolioAssets}
          />;
};
