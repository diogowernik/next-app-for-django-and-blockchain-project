// @/hooks/fetch/useFetchValuations.js

import { useState, useEffect } from 'react';
import { fetchValuations } from '@/api/valuations';

export const useFetchValuations = (id, token) => {
    const [valuations, setValuations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return; // Exit early if no ID is provided
        }
        const fetchAssets = async () => {
            try {
                const assets = await fetchValuations(id, token);
                setValuations(assets || []);
            } catch (err) {
                setError(err.message);
                setValuations([]); // Resetting to empty on error might not be desirable depending on the UX/UI design
            }
            setLoading(false);
        };
        fetchAssets();
    }, [id, token]);

    return { valuations, setValuations, loading, error }; // Return the setter function as well
};
