import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFetchAssets } from '@/hooks/fetch/useFetchAssets';

export const AssetSelector = ({ token, selectedAsset, setSelectedAsset, setSharePriceBRL, setSharePriceUSD }) => {
    const { assets, loading, error } = useFetchAssets(token);

    useEffect(() => {
        if (assets.length > 0 && !selectedAsset) {
            setSelectedAsset(assets[0]);
        }
    }, [assets, selectedAsset]);

    useEffect(() => {
        if (selectedAsset) {
            setSharePriceBRL(selectedAsset.price_brl.toFixed(2));
            setSharePriceUSD(selectedAsset.price_usd.toFixed(2));
        }
    }, [selectedAsset]);

    const assetOptions = assets.map(asset => ({
        value: asset.id,
        label: `${asset.ticker} - R$ ${asset.price_brl.toFixed(2)} | U$ ${asset.price_usd.toFixed(2)}`
    }));

    const handleSelectAsset = option => {
        setSelectedAsset(assets.find(asset => asset.id === option.value));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error loading data: {error}</p>;

    return (
        <Select
            options={assetOptions}
            value={assetOptions.find(option => option.value === selectedAsset?.id)}
            onChange={handleSelectAsset}
            className="basic-single"
            classNamePrefix="select"
        />
    );
};

