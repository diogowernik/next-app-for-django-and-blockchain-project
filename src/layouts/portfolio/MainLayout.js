// @/layouts/portfolio/MainLayout.js

import React from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const MainLayout = ({ children, portfolioId }) => {
    return (
        <PortfolioProvider portfolioId={portfolioId}>
            {children}
        </PortfolioProvider>
    );
};


