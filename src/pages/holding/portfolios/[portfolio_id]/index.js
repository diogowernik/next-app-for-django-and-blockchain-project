import React from 'react';
import { useRouter } from 'next/router';
import { PortfolioContextWrapper } from '@/layouts/holding/shared/PortfolioContextWrapper';
import { PortfolioLayout } from '@/layouts/holding/portfolio/PortfolioLayout';
import { CategoryDashboard } from '@/components/holding/CategoryDashboard';
import { BrokerDashboard } from '@/components/holding/BrokerDashboard';
import { GeoLocationDashboard } from '@/components/holding/GeoLocationDashboard';
import { DividendsByMonth } from '@/components/holding/DividendsByMonth';
import { DividendsByYear } from '@/components/holding/DividendsByYear';
import { DividendsByCategory } from '@/components/holding/DividendsByCategory';
// import { RadarsDashboard } from '@/components/holding/RadarsDashboard';
// import { EvolutionDashboard } from '@/components/holding/EvolutionDashboard';
import { useDashboardUrlChange } from '@/hooks/urls/useDashboardUrlChange';
import { ValuationDashboard } from '@/components/holding/ValuationDashboard';

const PortfolioPage = () => {
    const router = useRouter();
    const { portfolio_id } = router.query;
    const [activeDashboard, handleDashboardChange] = useDashboardUrlChange();

    if (!portfolio_id) return <p>Loading...</p>;

    const renderDashboard = () => {
        switch (activeDashboard) {
            case 'category':
                return <CategoryDashboard />;
            case 'broker':
                return <BrokerDashboard />;
            case 'geolocation':
                return <GeoLocationDashboard />;
            case 'dividends':
                return <DividendsByMonth />;
            case 'category-dividends':
                return <DividendsByCategory />;
            case 'dividends-by-year':
                return <DividendsByYear />;
            // case 'radars':
            //     return <RadarsDashboard />;
            // case 'evolution':
            //     return <EvolutionDashboard />;
            default:
                return <ValuationDashboard />;
            case 'valuation':
                return <ValuationDashboard />;
        }
    };

    return (
        <PortfolioContextWrapper portfolioId={portfolio_id}>
            <PortfolioLayout handleDashboardChange={handleDashboardChange}>
                {renderDashboard()}
            </PortfolioLayout>
        </PortfolioContextWrapper>
    );
};

export default PortfolioPage;
