import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useFetchAssets } from '@/hooks/fetch/useFetchAssets';

export const PortfolioAssetForm = ({ onSubmit, portfolioId, token }) => {
    const { assets, loading, error } = useFetchAssets(token);

    const [selectedAsset, setSelectedAsset] = useState(null);
    const [sharesAmount, setSharesAmount] = useState('');
    const [selectedBrokerId, setSelectedBrokerId] = useState(2);  // Definindo o ID do broker padrão

    useEffect(() => {
        if (assets.length > 0 && !selectedAsset) {
            setSelectedAsset(assets[0]);
        }
    }, [assets, selectedAsset]);

    const assetOptions = assets.map(asset => ({
        value: asset.id,
        label: `${asset.ticker} - R$ ${asset.price_brl.toFixed(2)} | U$ ${asset.price_usd.toFixed(2)}`
    }));

    const handleSelectAsset = option => {
        setSelectedAsset(assets.find(asset => asset.id === option.value));
    };

    const handleSubmit = event => {
        event.preventDefault();
        // Garanta que o portfolioId seja um número
        const numericPortfolioId = Number(portfolioId);
        onSubmit({
            portfolio: numericPortfolioId,
            asset: selectedAsset.id,
            broker: selectedBrokerId,
            sharesAmount: parseFloat(sharesAmount),
            sharePriceBRL: parseFloat(selectedAsset.price_brl.toFixed(2)),  // Arredondando para 2 casas decimais
            sharePriceUSD: parseFloat(selectedAsset.price_usd.toFixed(2))  // Arredondando para 2 casas decimais
        });
        console.log('submitted data:', {
            portfolioId: numericPortfolioId,
            assetId: selectedAsset.id,
            brokerId: selectedBrokerId,
            sharesAmount: parseFloat(sharesAmount),
            sharePriceBRL: selectedAsset.price_brl,
            sharePriceUSD: selectedAsset.price_usd
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error loading data: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Portfolio ID</label>
                <input
                    type="text"
                    value={portfolioId || ''}
                    readOnly
                />
            </div>
            <div>
                <label>Asset</label>
                <Select
                    options={assetOptions}
                    value={assetOptions.find(option => option.value === selectedAsset?.id)}
                    onChange={handleSelectAsset}
                    className="basic-single"
                    classNamePrefix="select"
                />
            </div>
            <div>
                <label>Broker ID</label>
                <input
                    type="number"
                    value={selectedBrokerId}
                    onChange={e => setSelectedBrokerId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Shares Amount</label>
                <input
                    type="number"
                    value={sharesAmount}
                    onChange={e => setSharesAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Share Average Price (BRL)</label>
                <input
                    type="number"
                    value={selectedAsset?.price_brl || ''}
                    disabled
                />
            </div>
            <div>
                <label>Share Average Price (USD)</label>
                <input
                    type="number"
                    value={selectedAsset?.price_usd || ''}
                    disabled
                />
            </div>
            <button type="submit">Add Investment</button>
        </form>
    );
};
