import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box } from '@mui/material';
import { MobileWrapper } from './view/MobileWrapper';
import { AvatarView } from './view/AvatarView';
import { profileData } from './view/mockData';
import { CryptosView } from './view/CryptosView';
import { BlockchainSelect } from './view/BlockchainSelect';
import { Footer } from './view/Footer'; 


export default function WtreeProfileView() {
    const router = useRouter();
    const username = router.query.profile;
    const [selectedBlockchain, setSelectedBlockchain] = useState('Binance Smart Chain Testnet');
    const [amounts, setAmounts] = useState({});

    useEffect(() => {
        // Aqui, você poderia simular a detecção de rede via MetaMask e atualizar selectedBlockchain conforme necessário
    }, []);

    const blockchains = profileData.accepted_cryptos.map(crypto => crypto.blockchain);
    const uniqueBlockchains = [...new Set(blockchains)]; // Gera uma lista de blockchains únicas

    return (
        <MobileWrapper>
            <Box sx={{ position: 'relative', width: '100%', textAlign: 'center', marginTop: '-20px', paddingTop: '60px' }}>
                <AvatarView />
                <Typography sx={{ fontSize: '1.2em', marginTop: '20px' }}>
                    @{username}
                </Typography>
                <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
                    {profileData.description}
                </Typography>
            </Box>
            
            <Typography sx={{ marginX: 3, marginTop: 5 }}>You are connected to:</Typography>
            <BlockchainSelect
                selectedBlockchain={selectedBlockchain}
                setSelectedBlockchain={setSelectedBlockchain}
                acceptedCryptos={uniqueBlockchains} // Passa apenas as blockchains únicas
            />

            {profileData.accepted_cryptos.filter(crypto => crypto.blockchain === selectedBlockchain).map(crypto => (
                <CryptosView
                    key={crypto.slug}
                    crypto={crypto}
                    amount={amounts[crypto.slug] || ''}
                    onAmountChange={(value) => setAmounts(prev => ({ ...prev, [crypto.slug]: value }))}
                />
            ))}
            <Footer />
        </MobileWrapper>
    );
}
