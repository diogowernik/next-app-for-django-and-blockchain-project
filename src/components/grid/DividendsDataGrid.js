import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

import { useAuth } from '@/context/AuthContext';

import { DividendsGrid } from '@/components/dividends/DividendsGrid';
import { DynamicNavPills } from '@/components/navpills/DynamicNavPills';

export const DividendsDataGrid = ({
  // ativos
  items,
  filterKey, // ex: category, broker (field name in the database)
  // ativos filtrados
  filteredAssets,
  filters,
  clearFilterByKey, 
  // para adicionar ativos
  addAsset,
  setCallbackFilters, 
  // para url
  urlFilters, 
  handleUrlFilterChange, 
}) => {

const { djangoToken } = useAuth();

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div" style={{ fontWeight: '500', fontFamily: '"Roboto Condensed", sans-serif' }}>
            Tabela de Dividendos
          </Typography>
        }
      />
      <CardContent sx={{ height: '85px' }}>
        <DynamicNavPills
          items={items}
          handleFilterUpdate={setCallbackFilters}
          clearFilters={() => clearFilterByKey(filterKey)}
          filters={filters}
          filterKey={filterKey}
          urlFilters={urlFilters}
          handleUrlFilterChange={handleUrlFilterChange}
        />
      </CardContent>
      <CardContent>
        <DividendsGrid
          djangoToken={djangoToken}
          filteredAssets={filteredAssets}
        />
      </CardContent>
    </Card>
  );
}

