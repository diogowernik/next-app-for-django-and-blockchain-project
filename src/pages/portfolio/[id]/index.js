// @pages/portfolio/[id].js

import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/portfolio/MainLayout';
import PortfolioAssetsGrid from '@/components/portfolio/PortfolioAssetsGrid';

const PortfolioPage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return <p>Loading...</p>;  // Verifique se o ID está definido

    return (
        <MainLayout portfolioId={id}>
            <PortfolioAssetsGrid />
        </MainLayout>
    );
};

export default PortfolioPage;
