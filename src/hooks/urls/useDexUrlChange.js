import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export const useDexUrlChange = () => {
    const router = useRouter();
    const [activeDashboard, setActiveDashboard] = useState(router.query.dashboard || 'dashboard');

    const handleDashboardChange = useCallback((dashboard) => {
        setActiveDashboard(dashboard);
        // Atualizar a URL sem recarregar a página
        router.push(`/dex/?dashboard=${dashboard}`, undefined, { shallow: true });
    }, [router]);

    return [activeDashboard, handleDashboardChange];
};

