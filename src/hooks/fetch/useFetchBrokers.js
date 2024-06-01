// @/hooks/fetch/useFetchBrokers.js

import { useState, useEffect } from 'react';
import { fetchBrokers } from '@/api/brokers'; // Verifique o caminho correto do import

export const useFetchBrokers = (token) => {
    const [brokers, setBrokers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrokersData = async () => {
            try {
                const brokersData = await fetchBrokers(token);
                setBrokers(brokersData || []);
            } catch (err) {
                setError(err.message || "Failed to fetch brokers");
                setBrokers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBrokersData();
    }, [token]);

    return { brokers, loading, error };
};
