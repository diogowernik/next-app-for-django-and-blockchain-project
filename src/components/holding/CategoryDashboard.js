import React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { PortfolioAssetModalButton } from './portfolio-assets/PortfolioAssetModalButton';
import { PortfolioAssetsTreemap } from './portfolio-assets/PortfolioAssetsTreemap';
import { PortfolioAssetsTotalsGrid } from './portfolio-assets/PortfolioAssetsTotalsGrid';
import { PortfolioAssetsGrid } from './portfolio-assets/PortfolioAssetsGrid';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';
import { useDynamicFilters } from '@/hooks';
import { PortfolioAssetsDonutPieChart } from '@/components/holding/portfolio-assets/PortfolioAssetsDonutPieChart';
import { DynamicNavPills } from '@/components/navpills/DynamicNavPills';


export const CategoryDashboard = () => {
  const { djangoToken } = useAuth();
  const { portfolioAssets, categories } = usePortfolio();
  const { filteredAssets, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(portfolioAssets, { category: '' });

  return (
    <>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsTotalsGrid
            assets={filteredAssets}
            filterKey="category"
            Filter={filters.category}
          />
      </Grid>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsDonutPieChart
            assets={filteredAssets}
            filterKey="category"
            Filter={filters.category}
          />
      </Grid>
      <Grid item xs={12}>
      <Card>
            <CardHeader
                  title={
                      <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
                          Asset Overview
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
                items={categories}
                handleFilterUpdate={setCallbackFilters}
                clearFilters={() => clearFilterByKey('category')}
                filters={filters}
                filterKey="category"
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
                filterKey="category"
                Filter={filters.category}
            />
          </CardContent>
        </Card>
      </Grid>

    </>
  );
};
