// @/hooks/pages/useDynamicFilters.js

import { useState, useEffect } from 'react';

export const useDynamicFilters = (assets, filterKeys) => {
    const [filters, setFilters] = useState(filterKeys);
    const [filteredAssets, setFilteredAssets] = useState([]);

    useEffect(() => {
        const filtered = assets.filter(asset => {
            return Object.keys(filters).every(key => {
                return asset[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        setFilteredAssets(filtered);
    }, [filters, assets]);

    return { filteredAssets, filters, setFilters };
};
