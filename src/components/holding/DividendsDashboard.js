import React from 'react';
import { Grid} from '@mui/material';

// import { DividendsDonutPieChart } from '@/components/portfolios/DividendsDonutPieChart';
import { DividendsTotalsGrid } from '@/components/dividends/DividendsTotalsGrid';
import { DividendsDataGrid } from '@/components/grid/DividendsDataGrid';

import { useUrlFilterChange } from '@/hooks/urls/useUrlFilterChange';
import { useDynamicFilters } from '@/hooks/grid/useDynamicFilters';

export const DividendsDashboard = ({ filterKey, items, dividends }) => {
  const { filteredAssets, filters, setCallbackFilters, addAsset, clearFilterByKey } = useDynamicFilters(dividends, { [filterKey]: '' });
  const [urlFilters, handleUrlFilterChange] = useUrlFilterChange({ [filterKey]: '' });

  return (
    <>
      <Grid item xs={12} md={6}>
        <DividendsTotalsGrid
          assets={filteredAssets}
          filterKey={filterKey}
          Filter={filters[filterKey]}
        />
      </Grid>
      {/* <Grid item xs={12} md={6}>
        <DividendsDonutPieChart
          assets={filteredAssets}
          filterKey={filterKey}
          Filter={filters[filterKey]}
        />
      </Grid> */}
      <Grid item xs={12}>
        <DividendsDataGrid
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
    </>
  );
};
