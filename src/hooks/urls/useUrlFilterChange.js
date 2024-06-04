import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export const useUrlFilterChange = (initialFilters) => {
    const router = useRouter();
    const [urlFilters, setUrlFilters] = useState(() => {
        // Garantir que cada filtro tenha um valor inicial do query ou do initialFilters
        return Object.keys(initialFilters).reduce((acc, key) => {
            return { ...acc, [key]: router.query[key] || initialFilters[key] };
        }, {});
    });

    const handleUrlFilterChange = useCallback((filterKey, value) => {
        setUrlFilters(prev => ({ ...prev, [filterKey]: value }));
        // Definindo valores padrões para a URL
        const newQuery = { 
            dashboard: router.query.dashboard || 'category', // Default para 'category' se estiver vazio
            by: value
        };
        // Construindo a URL com valores padrões quando necessários
        const href = `/holding/portfolios/${router.query.portfolio_id}?${new URLSearchParams(newQuery)}`;
        router.push(href, undefined, { shallow: true });
    }, [router]);

    return [urlFilters, handleUrlFilterChange];
};
