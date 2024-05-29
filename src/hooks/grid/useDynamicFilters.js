import { useState, useEffect, useCallback } from 'react';

export const useDynamicFilters = (assets, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters);
    const [filteredAssets, setFilteredAssets] = useState([]);

    useEffect(() => {
        const filtered = assets.filter(asset => 
            Object.keys(filters).every(key => 
                asset[key].toLowerCase().includes(filters[key].toLowerCase())
            )
        );
        setFilteredAssets(filtered);
    }, [filters, assets]);

    const setFilter = useCallback((type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    }, [setFilters]);

    const clearFilters = () => {
        setFilters(initialFilters);
    };

    const clearFilterByKey = useCallback((key) => {
        setFilters(prev => ({ ...prev, [key]: '' }));
    }, []);

    const addAsset = useCallback((newAsset) => {
        setFilteredAssets(prevAssets => [...prevAssets, newAsset]);
    }, []);

    return { filteredAssets, filters, setFilters, setFilter, clearFilters, clearFilterByKey, addAsset };
};
