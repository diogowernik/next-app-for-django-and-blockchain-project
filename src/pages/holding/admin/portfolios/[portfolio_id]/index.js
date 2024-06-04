// @pages/holding/portfolios/[portfolio_id]/index

import React from 'react';
import { useRouter } from 'next/router';
import { PortfolioContextWrapper } from '@/layouts/holding/shared/PortfolioContextWrapper';
import { PortfolioAdminLayout } from '@/components/admin/PortfolioAdminLayout';

const PortfolioPage = () => {
    const router = useRouter();
    const { portfolio_id } = router.query;

    if (!portfolio_id) return <p>Loading...</p>;  

    return (
        <PortfolioContextWrapper portfolioId={portfolio_id}>
            <PortfolioAdminLayout />
        </PortfolioContextWrapper>
    );
};

export default PortfolioPage;