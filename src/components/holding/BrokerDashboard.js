import React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography } from '@mui/material';

import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';

import { PortfolioAssetsDonutPieChart } from '@/components/portfolios/PortfolioAssetsDonutPieChart';
import { PortfolioAssetModalButton } from '@/components/portfolios/PortfolioAssetModalButton';
import { PortfolioAssetsTreemap } from '@/components/portfolios/PortfolioAssetsTreemap';
import { PortfolioAssetsTotalsGrid } from '@/components/portfolios/PortfolioAssetsTotalsGrid';
import { PortfolioAssetsGrid } from '@/components/portfolios/PortfolioAssetsGrid';

import { DynamicNavPills } from '@/components/navpills/DynamicNavPills';

import { useUrlFilterChange } from '@/hooks/urls/useUrlFilterChange';
import { useDynamicFilters } from '@/hooks/grid/useDynamicFilters';

export const BrokerDashboard = () => {
  const { djangoToken } = useAuth();
  const { portfolioAssets, brokers } = usePortfolio();  // Usando brokers em vez de categories
  const { filteredAssets, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(portfolioAssets, { broker: '' });
  const [urlFilters, handleUrlFilterChange] = useUrlFilterChange({ broker: '' }); // Renomeado para 'urlFilters'


  return (
    <>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsTotalsGrid
            assets={filteredAssets}
            filterKey="broker"
            Filter={filters.broker}   // Mudando para broker
          />
      </Grid>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsDonutPieChart
            assets={filteredAssets}
            filterKey="broker"
            Filter={filters.broker}  // Mudando para broker
          />
      </Grid>
      <Grid item xs={12}>
      <Card>
            <CardHeader
                  title={
                      <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
                          Broker Grid
                      </Typography>
                  }
                  action={
                      <PortfolioAssetModalButton 
                          djangoToken={djangoToken} 
                          addAssetToGrid={addAsset} 
                      />
                  }
              />
            <CardContent sx={{ height: '85px'} }>
            <DynamicNavPills
                items={brokers}
                handleFilterUpdate={setCallbackFilters}
                clearFilters={() => clearFilterByKey('broker')}
                filters={filters} // já está sendo usado não pode ser removido
                filterKey="broker"
                urlFilters={urlFilters} // Adicionado
                handleUrlFilterChange={handleUrlFilterChange} // Adicionado
            />

            </CardContent>
            <CardContent>
            <PortfolioAssetsGrid
              djangoToken={djangoToken}
              filteredAssets={filteredAssets}
            />
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <PortfolioAssetsTreemap 
                assets={filteredAssets}
                filterKey="broker"
                Filter={filters.broker} 
            />
          </CardContent>
        </Card>
      </Grid>

    </>
  );
};
