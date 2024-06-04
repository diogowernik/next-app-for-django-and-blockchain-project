import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export const useDashboardUrlChange = () => {
    const router = useRouter();
    const [activeDashboard, setActiveDashboard] = useState(router.query.dashboard || 'category');

    const handleDashboardChange = useCallback((dashboard) => {
        setActiveDashboard(dashboard);
        // Atualizar a URL sem recarregar a página
        router.push(`/holding/portfolios/${router.query.portfolio_id}?dashboard=${dashboard}`, undefined, { shallow: true });
    }, [router]);

    return [activeDashboard, handleDashboardChange];
};

