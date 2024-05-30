// @pages/portfolio/[portfolio_id]/index.js (PortfolioPage)

import React from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from '@/layouts/portfolio/MainLayout';
import { PortfolioAssetsAdmin } from '@/components/holding/admin/PortfolioAssetsAdmin';

const PortfolioPage = () => {
    const router = useRouter();
    const { portfolio_id } = router.query;

    if (!portfolio_id) return <p>Loading...</p>;  // Verifique se o ID está definido

    return (
        <MainLayout portfolioId={portfolio_id}>
            <PortfolioAssetsAdmin />
        </MainLayout>
    );
};

export default PortfolioPage;
