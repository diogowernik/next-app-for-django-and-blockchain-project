// @/context/PortfolioContext

import React, { createContext, useContext } from 'react';
import { useFetchPortfolioAssets } from '@/hooks/fetch/useFetchPortfolioAssets';
import { useFetchDividends } from '@/hooks/fetch/useFetchDividends';
import { useAuth } from '@/context/AuthContext';
import { useExtractedField } from '@/hooks/data/useExtractedField';
import { useYearlyDividends } from '@/hooks/data/useYearlyDividends';

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children, portfolioId }) => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error } = useFetchPortfolioAssets(portfolioId, djangoToken);
    const { dividends, setDividends } = useFetchDividends(portfolioId, djangoToken);

    const categories = useExtractedField(portfolioAssets, 'category');
    const brokers = useExtractedField(portfolioAssets, 'broker');
    const geolocations = useExtractedField(portfolioAssets, 'geolocation');

    const monthlyDividends = useExtractedField(dividends, 'pay_date_by_month_year');
    const categoryDividends = useExtractedField(dividends, 'category');
    const yearlyDividends = useYearlyDividends(dividends);

    const value = {
        portfolioAssets,
        setPortfolioAssets,
        categories,
        brokers,
        geolocations,
        loading,
        error,
        dividends,
        setDividends,
        monthlyDividends,
        yearlyDividends,
        categoryDividends,
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
