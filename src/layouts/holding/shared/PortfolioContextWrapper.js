// @/layouts/portfolio/PortfolioContextWrapper.js

import React from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const PortfolioContextWrapper = ({ children, portfolioId }) => {
    return (
        <PortfolioProvider portfolioId={portfolioId}>
            {children}
        </PortfolioProvider>
    );
};


