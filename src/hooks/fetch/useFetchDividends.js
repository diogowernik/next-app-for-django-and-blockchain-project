// @/hooks/fetch/useFetchDividends.js

import { useState, useEffect } from 'react';
import { fetchDividends } from '@/api/dividends';

export const useFetchDividends = (id, token) => {
    const [dividends, setDividends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return; // Exit early if no ID is provided
        }
        const fetchAssets = async () => {
            try {
                const assets = await fetchDividends(id, token);
                setDividends(assets || []);
            } catch (err) {
                setError(err.message);
                setDividends([]); // Resetting to empty on error might not be desirable depending on the UX/UI design
            }
            setLoading(false);
        };
        fetchAssets();
    }, [id, token]);

    return { dividends, setDividends, loading, error }; // Return the setter function as well
};

