import React from 'react';
import { HoldingDashboard } from '@/components/holding/HoldingDashboard';
import { usePortfolio } from '@/context/PortfolioContext';


export const GeoLocationDashboard = () => {
  const { portfolioAssets, geolocations } = usePortfolio();


  return <HoldingDashboard 
            filterKey="geolocation" 
            items={geolocations}
            portfolioAssets={portfolioAssets}
          />;
};
