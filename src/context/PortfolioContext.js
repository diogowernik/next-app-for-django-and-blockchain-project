// @/context/PortfolioContext

import React, { createContext, useContext } from 'react';
import { useFetchPortfolioAssets } from '@/hooks/fetch/useFetchPortfolioAssets';
import { useFetchDividends } from '@/hooks/fetch/useFetchDividends';
import { useAuth } from '@/context/AuthContext';
import { useExtractedField } from '@/hooks/data/useExtractedField';
import { useFetchValuations } from '@/hooks/fetch/useFetchValuations';

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children, portfolioId }) => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading: loadingAssets, error: errorAssets } = useFetchPortfolioAssets(portfolioId, djangoToken);
    const { dividends, setDividends } = useFetchDividends(portfolioId, djangoToken);
    const { valuations, setValuations, loading: loadingValuations, error: errorValuations } = useFetchValuations(portfolioId, djangoToken);

    const categories = useExtractedField(portfolioAssets, 'category');
    const brokers = useExtractedField(portfolioAssets, 'broker');
    const geolocations = useExtractedField(portfolioAssets, 'geolocation');

    const dividends_by_month = useExtractedField(dividends, 'pay_date_by_month_year');
    const dividends_by_year = useExtractedField(dividends, 'pay_date_by_year');
    const dividends_by_category = useExtractedField(dividends, 'category');

    const value = {
        portfolioAssets,
        setPortfolioAssets,
        loadingAssets,
        errorAssets,
        categories,
        brokers,
        geolocations,
        dividends,
        setDividends,
        dividends_by_month,
        dividends_by_year,
        dividends_by_category,
        valuations,
        setValuations,
        loadingValuations,
        errorValuations,
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
