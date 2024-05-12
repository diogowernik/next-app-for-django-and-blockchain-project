// @/hooks/fetch/useFetchPortfolioAssets.js

import { useState, useEffect } from 'react';
import { fetchPortfolioAssets } from '@/api/portfolioAssets';

export const useFetchPortfolioAssets = (id, token) => {
    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return; // Exit early if no ID is provided
        }
        const fetchAssets = async () => {
            try {
                const assets = await fetchPortfolioAssets(id, token);
                setPortfolioAssets(assets || []);
            } catch (err) {
                setError(err.message);
                setPortfolioAssets([]); // Resetting to empty on error might not be desirable depending on the UX/UI design
            }
            setLoading(false);
        };
        fetchAssets();
    }, [id, token]);

    return { portfolioAssets, setPortfolioAssets, loading, error }; // Return the setter function as well
};

