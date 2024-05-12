// @/components/portfolio-assets/PortfolioAssets.js

import React from 'react';
import { CircularProgress } from '@mui/material';
import PortfolioAssetsGrid from './PortfolioAssetsGrid';
import DynamicFilters from '@/utils/grid/DynamicFilters';
import { useAuth } from '@/context/AuthContext';
import useFetchPortfolioAssets from '@/hooks/pages/useFetchPortfolioAssets';
import useDynamicFilters from '@/hooks/pages/useDynamicFilters';  

const PortfolioAssets = ({ id }) => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error } = useFetchPortfolioAssets(id, djangoToken);
    const { filteredAssets, filters, setFilters } = useDynamicFilters(portfolioAssets, { category: '', broker: '' });

    return (
        <>
            <DynamicFilters filters={filters} setFilters={setFilters} />
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <p>Error loading assets: {error}</p>
            ) : (
                <PortfolioAssetsGrid
                    assets={filteredAssets}
                    setAssets={setPortfolioAssets}
                    authToken={djangoToken}
                />
            )}
        </>
    );
};

export default PortfolioAssets;
