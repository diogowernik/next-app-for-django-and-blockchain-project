import React from 'react';
import { Grid } from '@mui/material';

import { ValuationDataGrid } from '@/components/grid/ValuationDataGrid';
import { usePortfolio } from '@/context/PortfolioContext';
import { useAuth } from '@/context/AuthContext';
import ValuationTotalChart from '@/components/valuations/ValuationTotalChart';
import ValuationQuotaChart from '@/components/valuations/ValuationQuotaChart';

export const ValuationDashboard = () => {
  const { valuations, loadingValuations: loading, errorValuations: error } = usePortfolio();
  const { djangoToken } = useAuth();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ValuationTotalChart valuations={valuations} />
        </Grid>
        <Grid item xs={12}>
          <ValuationQuotaChart valuations={valuations} />
        </Grid>
        <Grid item xs={12}>
          <ValuationDataGrid
            djangoToken={djangoToken}
            valuations={valuations}
            loading={loading}
            error={error}
          />
        </Grid>
      </Grid>
    </>
  );
};
