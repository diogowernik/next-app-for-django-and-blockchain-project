import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import { PortfolioAssetModalButton } from './portfolio-assets/PortfolioAssetModalButton';
import { PortfolioAssetsPieChart } from './portfolio-assets/PortfolioAssetsPieChart';
import { PortfolioAssetsTreemap } from './portfolio-assets/PortfolioAssetsTreemap';
import { CategoryNavPills } from './CategoryNavPills';
import { PortfolioAssetsTotalsGrid } from './portfolio-assets/PortfolioAssetsTotalsGrid';
import { PortfolioAssetsGrid } from './portfolio-assets/PortfolioAssetsGrid';
import { useAuth } from '@/context/AuthContext';
import { usePortfolio } from '@/context/PortfolioContext';
import { useDynamicFilters } from '@/hooks';
import { PortfolioAssetsDonutChart } from './portfolio-assets/PortfolioAssetsDonutChart';
import { PortfolioAssetsDonutPieChart } from './portfolio-assets/PortfolioAssetsDonutPiechart';


export const PortfolioDashboard = () => {
  const { djangoToken } = useAuth();
  const { portfolioAssets, categories } = usePortfolio();
  const { filteredAssets, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(portfolioAssets, { category: '' });

  return (
    <>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsTotalsGrid
            assets={filteredAssets}
            categoryFilter={filters.category}
          />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '480px' }}>
          <CardContent>
            {/* <PortfolioAssetsDonutChart
              assets={filteredAssets}
              categoryFilter={filters.category}
            /> */}
            {/* <PortfolioAssetsPieChart 
                assets={filteredAssets} 
                categoryFilter={filters.category} /> */}
                <PortfolioAssetsDonutPieChart
                  assets={filteredAssets}
                  categoryFilter={filters.category}
                />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
          <PortfolioAssetModalButton 
            djangoToken={djangoToken} 
            addAssetToGrid={addAsset} 
          />
            <CategoryNavPills
              categories={categories}
              filters={filters}
              handleFilterUpdate={setCallbackFilters}
              clearCategoryFilters={() => clearFilterByKey('category')}
              />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
      <PortfolioAssetsGrid
        djangoToken={djangoToken}
        filteredAssets={filteredAssets}
      />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <PortfolioAssetsTreemap 
              assets={filteredAssets} 
              categoryFilter={filters.category} 
            />
          </CardContent>
        </Card>
      </Grid>

    </>
  );
};
