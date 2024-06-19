import React from 'react';
import { useRouter } from 'next/router';
import { PortfolioContextWrapper } from '@/layouts/holding/shared/PortfolioContextWrapper';
import { PortfolioLayout } from '@/layouts/holding/portfolio/PortfolioLayout';
import { CategoryDashboard } from '@/components/holding/CategoryDashboard';
import { BrokerDashboard } from '@/components/holding/BrokerDashboard';
import { GeoLocationDashboard } from '@/components/holding/GeoLocationDashboard';
// import { DividendsDashboard } from '@/components/holding/DividendsDashboard';
// import { RadarsDashboard } from '@/components/holding/RadarsDashboard';
// import { EvolutionDashboard } from '@/components/holding/EvolutionDashboard';
import { useDashboardUrlChange } from '@/hooks/urls/useDashboardUrlChange';

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
            // case 'dividends':
            //     return <DividendsDashboard />;
            // case 'radars':
            //     return <RadarsDashboard />;
            // case 'evolution':
            //     return <EvolutionDashboard />;
            default:
                return <CategoryDashboard />;
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
