import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';

import { PortfolioAssetsDonutPieChart } from '@/components/portfolios/PortfolioAssetsDonutPieChart';
import { PortfolioAssetsTreemap } from '@/components/portfolios/PortfolioAssetsTreemap';
import { PortfolioAssetsTotalsGrid } from '@/components/portfolios/PortfolioAssetsTotalsGrid';
import { InteractiveDataGrid } from '@/components/grid/InteractiveDataGrid';

import { useUrlFilterChange } from '@/hooks/urls/useUrlFilterChange';
import { useDynamicFilters } from '@/hooks/grid/useDynamicFilters';

export const HoldingDashboard = ({ filterKey, items, portfolioAssets }) => {
  const { filteredAssets, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(portfolioAssets, { [filterKey]: '' });
  const [urlFilters, handleUrlFilterChange] = useUrlFilterChange({ [filterKey]: '' });

  return (
    <>
      <Grid item xs={12} md={6}>
        <PortfolioAssetsTotalsGrid
          assets={filteredAssets}
          filterKey={filterKey}
          Filter={filters[filterKey]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PortfolioAssetsDonutPieChart
          assets={filteredAssets}
          filterKey={filterKey}
          Filter={filters[filterKey]}
        />
      </Grid>
      <Grid item xs={12}>
        <InteractiveDataGrid
          items={items}
          filterKey={filterKey}
          addAsset={addAsset}
          filteredAssets={filteredAssets}
          filters={filters}
          clearFilterByKey={clearFilterByKey}
          setCallbackFilters={setCallbackFilters}
          urlFilters={urlFilters}
          handleUrlFilterChange={handleUrlFilterChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <PortfolioAssetsTreemap
              assets={filteredAssets}
              filterKey={filterKey}
              Filter={filters[filterKey]}
            />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
