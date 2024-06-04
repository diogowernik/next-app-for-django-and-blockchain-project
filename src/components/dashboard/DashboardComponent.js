import React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { PortfolioAssetModalButton } from '@/components/holding/portfolio-assets/PortfolioAssetModalButton';
import { PortfolioAssetsTreemap } from '@/components/holding/portfolio-assets/PortfolioAssetsTreemap';
import { DynamicNavPills } from '@/components/navpills/DynamicNavPills';
import { PortfolioAssetsTotalsGrid } from '@/components/holding/portfolio-assets/PortfolioAssetsTotalsGrid';
import { PortfolioAssetsGrid } from '@/components/holding/portfolio-assets/PortfolioAssetsGrid';
import { useAuth } from '@/context/AuthContext';
import { useDynamicFilters } from '@/hooks';
import { PortfolioAssetsDonutPieChart } from '@/components/holding/portfolio-assets/PortfolioAssetsDonutPieChart';

export const DashboardComponent = ({ data, navPillsProps, donutChartFilter, totalsGridFilter, treemapFilter, title }) => {
  const { djangoToken } = useAuth();
  const { filteredData, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(data, { filterKey: '' });


  return (
    <>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsTotalsGrid
            assets={filteredData}
            categoryFilter={totalsGridFilter}
          />
      </Grid>
      <Grid item xs={12} md={6}>
          <PortfolioAssetsDonutPieChart
            assets={filteredData}
            categoryFilter={donutChartFilter}
          />
      </Grid>
      <Grid item xs={12}>
        <Card>
            <CardHeader
                  title={
                      <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
                          {title}
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
                    items={navPillsProps.items}
                    filterKey={navPillsProps.filterKey}
                    handleFilterUpdate={setCallbackFilters}
                    clearFilters={() => clearFilterByKey(navPillsProps.filterKey)}
                    filters={filters}
                />
            </CardContent>
            <CardContent>
            <PortfolioAssetsGrid
              djangoToken={djangoToken}
              filteredData={filteredData}
            />
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <PortfolioAssetsTreemap 
              assets={filteredData} 
              categoryFilter={treemapFilter} 
            />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
