// CreateProfileProfile.js
import React, { useState, useMemo } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import UsernameInput from './form/UsernameInput';
import AvatarUpload from './form/AvatarUpload';
import DescriptionInput from './form/DescriptionInput';  
import CryptoSelection from './form/CryptoSelection';
import MobileWrapper from './form/MobileWrapper';

const cryptos = [
    // bsctestnet
    { slug: 'usdt-bsctestnet', name: 'USDT (Tether)', icon: '/icons/usdt.png', contract: "0xfakeUsdtContractAddress", blockchain: "Binance Smart Chain Testnet", transferContract: "0x3f1B88117403E3AB6F730eFE77e2E7d652501988" },
    { slug: 'bnb-bsctestnet', name: 'BNB (Binance Coin)', icon: '/icons/bnb.png', contract: "0xfakeBnbContractAddress", blockchain: "Binance Smart Chain Testnet", transferContract: "0x3f1B88117403E3AB6F730eFE77e2E7d652501988" },
    // amoy
    { slug: 'usdc-amoy', name: 'USDC (USD Coin)', icon: '/icons/usdc.png', contract: "0xfakeUsdcContractAddress", blockchain: "Amoy Network (Polygon Testnet)", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" },
    { slug: 'matic-amoy', name: 'MATIC (Polygon)', icon: '/icons/matic.png', contract: "0xfakeMaticContractAddress", blockchain: "Amoy Network (Polygon Testnet)", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" },
    // sepolia
    { slug: 'eth-sepolia', name: 'ETH (Ethereum)', icon: '/icons/eth.png', contract: "0xfakeEthContractAddress", blockchain: "Sepolia Testnet", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" },
    { slug: 'usdt-sepolia', name: 'USDT (Tether)', icon: '/icons/usdt.png', contract: "0xfakeUsdtContractAddress", blockchain: "Sepolia Testnet", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" },

];

export const WtreeProfileCreate = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCryptos, setSelectedCryptos] = useState([]);

    const cryptoGroups = useMemo(() => {
        return cryptos.reduce((acc, crypto) => {
            const { blockchain } = crypto;
            if (!acc[blockchain]) {
                acc[blockchain] = [];
            }
            acc[blockchain].push(crypto);
            return acc;
        }, {});
    }, []);

    // Esta função pode ser expandida com lógica de API
    const handleSaveProfile = async () => {
        console.log(`Salvando perfil para o apelido: ${username}`);
    };
    const handleCryptoSelection = (cryptoId) => {
        if (selectedCryptos.includes(cryptoId)) {
            setSelectedCryptos(selectedCryptos.filter(id => id !== cryptoId));
        } else {
            setSelectedCryptos([...selectedCryptos, cryptoId]);
        }
    }

    return (
        <MobileWrapper>
            <AvatarUpload 
                avatar={avatar}
                onAvatarChange={setAvatar} 
            />
            <UsernameInput 
                username={username}    
                setUsername={setUsername} 
            />
            <DescriptionInput 
                description={description} 
                setDescription={setDescription} 
            />
            <Typography variant="h6" color="primary" style={{ alignSelf: 'left', margin: '15px' }}>
                Which Crypto Do You Accept?
            </Typography>
            {Object.entries(cryptoGroups).map(([blockchain, cryptos]) => (
                <>
                    <Typography variant="h6" style={{ margin: '15px', float: 'left' }}>
                        {blockchain}
                    </Typography>
                    {cryptos.map(crypto => (
                        <CryptoSelection
                            key={crypto.slug}  // Mudança aqui: key deve ser único
                            crypto={crypto.name}
                            icon={crypto.icon}
                            selected={selectedCryptos.includes(crypto.slug)}  // Mudança para usar 'slug' como identificador
                            onToggle={() => handleCryptoSelection(crypto.slug)}  // Mudança para usar 'slug' como identificador
                        />
                    ))}
                </>
            ))}
            <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ margin: 2}}>
                Save Profile
            </Button>
        </MobileWrapper>
    );
};
