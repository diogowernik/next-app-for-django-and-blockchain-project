// @/hooks/fetch/useFetchAssets.js

import { useState, useEffect } from 'react';
import { fetchAssets } from '@/api/Assets'; // Verifique o caminho correto do import

export const useFetchAssets = (token) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssetsData = async () => {
            try {
                const assetsData = await fetchAssets(token);
                setAssets(assetsData || []);
            } catch (err) {
                setError(err.message || "Failed to fetch assets");
                setAssets([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAssetsData();
    }, [token]);

    return { assets, loading, error };
};
