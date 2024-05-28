// @/context/PortfolioContext

import React, { createContext, useContext } from 'react';
import { useFetchPortfolioAssets } from '@/hooks';
import { useAuth } from '@/context/AuthContext';
import { useExtractedField } from '@/hooks/data/useExtractedField';

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children, portfolioId }) => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error } = useFetchPortfolioAssets(portfolioId, djangoToken);

    const categories = useExtractedField(portfolioAssets, 'category');
    const brokers = useExtractedField(portfolioAssets, 'broker');

    const value = {
        portfolioAssets,
        setPortfolioAssets,
        categories,
        brokers,
        loading,
        error
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => useContext(PortfolioContext);
