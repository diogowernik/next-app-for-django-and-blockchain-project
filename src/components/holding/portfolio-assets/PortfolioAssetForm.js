import React, { useState } from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { AssetSelector } from '../assets/AssetSelector';
import { BrokerSelector } from '../brokers/BrokerSelector';

export const PortfolioAssetForm = ({ onSubmit, portfolioId, token }) => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [selectedBroker, setSelectedBroker] = useState(null); // Atualizado para manter o broker inteiro
    
    const [sharesAmount, setSharesAmount] = useState('');
    const [sharePriceBRL, setSharePriceBRL] = useState('');
    const [sharePriceUSD, setSharePriceUSD] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const numericPortfolioId = Number(portfolioId);

        try {
            const response = await onSubmit({
                portfolio: numericPortfolioId,
                asset: selectedAsset.id,
                broker: selectedBroker.id, // Atualizado para enviar o ID do broker selecionado
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
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>Asset</FormLabel>
                <AssetSelector
                    token={token}
                    selectedAsset={selectedAsset}
                    setSelectedAsset={setSelectedAsset}
                    setSharePriceBRL={setSharePriceBRL}
                    setSharePriceUSD={setSharePriceUSD}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Broker</FormLabel>
                <BrokerSelector
                    token={token}
                    selectedBroker={selectedBroker}
                    setSelectedBroker={setSelectedBroker}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Shares Amount</FormLabel>
                <FormControl
                    type="number"
                    value={sharesAmount}
                    onChange={e => setSharesAmount(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Share Average Price (BRL)</FormLabel>
                <FormControl
                    type="number"
                    value={sharePriceBRL}
                    onChange={e => setSharePriceBRL(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Share Average Price (USD)</FormLabel>
                <FormControl
                    type="number"
                    value={sharePriceUSD}
                    onChange={e => setSharePriceUSD(e.target.value)}
                />
            </FormGroup>
            <Button 
                type="submit"
                variant="primary"
                style={{ marginTop: '20px' }}
                // centralizar
                className="d-block mx-auto"
            >
                Add Investment</Button>
        </Form>
    );
};
