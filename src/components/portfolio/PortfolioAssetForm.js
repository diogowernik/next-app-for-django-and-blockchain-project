import React, { useState } from 'react';
import { AssetSelector } from './AssetSelector';

export const PortfolioAssetForm = ({ onSubmit, portfolioId, token }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [sharesAmount, setSharesAmount] = useState('');
    const [sharePriceBRL, setSharePriceBRL] = useState('');
    const [sharePriceUSD, setSharePriceUSD] = useState('');
    const [selectedBrokerId, setSelectedBrokerId] = useState(2); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const numericPortfolioId = Number(portfolioId);
    
        try {
            const response = await onSubmit({
                portfolio: numericPortfolioId,
                asset: selectedAsset.id,
                broker: selectedBrokerId,
                shares_amount: sharesAmount,
                share_average_price_brl: sharePriceBRL, 
                share_average_price_usd: sharePriceUSD 
            });
            if (response.success) {
                // mensagem de sucesso já é exibida no hook useAddPortfolioAsset
            } else {
                throw new Error(response.message || "Failed to add investment");
            }
        } catch (error) {
            // Exibir mensagem de erro já é exibida no hook useAddPortfolioAsset
        }
    };
    


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
                <AssetSelector
                    token={token}
                    selectedAsset={selectedAsset}
                    setSelectedAsset={setSelectedAsset}
                    setSharePriceBRL={setSharePriceBRL}
                    setSharePriceUSD={setSharePriceUSD}
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
                    value={sharePriceBRL}
                    onChange={e => setSharePriceBRL(e.target.value)}
                />
            </div>
            <div>
                <label>Share Average Price (USD)</label>
                <input
                    type="number"
                    value={sharePriceUSD}
                    onChange={e => setSharePriceUSD(e.target.value)}
                />
            </div>
            <button type="submit">Add Investment</button>
        </form>
    );
};
