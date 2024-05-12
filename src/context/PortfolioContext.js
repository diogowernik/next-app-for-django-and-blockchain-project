// src/context/PortfolioContext.js

import React, { createContext, useContext } from 'react';
import { useFetchPortfolioAssets } from '@/hooks';
import { useAuth } from '@/context/AuthContext';

export const PortfolioContext = createContext(null);  // Assegure-se de que o contexto é exportado

export const PortfolioProvider = ({ children, portfolioId }) => {
    const { djangoToken } = useAuth();
    const { portfolioAssets, setPortfolioAssets, loading, error } = useFetchPortfolioAssets(portfolioId, djangoToken);

    const value = {
        portfolioAssets,
        setPortfolioAssets,
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
