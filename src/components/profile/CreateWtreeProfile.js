// CreateProfileProfile.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import UsernameInput from './form/UsernameInput';
import AvatarUpload from './form/AvatarUpload';
import DescriptionInput from './form/DescriptionInput';  
import CryptoSelection from './form/CryptoSelection';
import ChainSelection from './form/ChainSelection'; 
import MobileWrapper from './form/MobileWrapper';

const cryptos = [
    { id: 'usdt', name: 'USDT (Theter)', icon: '/icons/usdt.png' },
    { id: 'usdc', name: 'USDC (USD Coin)', icon: '/icons/usdc.png' },
    { id: 'eth', name: 'ETH (Ethereum)', icon: '/icons/eth.png' },
    { id: 'matic', name: 'MATIC (Polygon)', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB (Bincance Coin)', icon: '/icons/bnb.png' },
];

const chains = [
    { id: 'ethereum', name: 'Ethereum (Ethereum Chain)', icon: '/icons/eth.png' },
    { id: 'polygon', name: 'Polygon (Matic)', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB (Binance Smart Chain)' , icon: '/icons/bnb.png' },
    
];

export const CreateWtreeProfile = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [selectedChains, setSelectedChain] = useState('');

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
    const handleChainSelection = (chainId) => {
        if (selectedChains.includes(chainId)) {
            setSelectedChain(selectedChains.filter(id => id !== chainId));
        }
        else {
            setSelectedChain([...selectedChains, chainId]);
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
            <Typography variant="h6" style={{ alignSelf: 'center', margin: '15px' }}>
                Which Tokens Do You Accept?
            </Typography>
            {cryptos.map(crypto => (
                <CryptoSelection
                    key={crypto.id}
                    crypto={crypto.name}
                    icon={crypto.icon}
                    selected={selectedCryptos.includes(crypto.id)}
                    onToggle={() => handleCryptoSelection(crypto.id)}
                />
            ))}
            <Typography variant="h6" style={{ alignSelf: 'center', margin: '15px' }}>
                Which Chains Do You Use?
            </Typography>
            {chains.map(chain => (
                <ChainSelection
                    key={chain.id}
                    chain={chain.name}
                    icon={chain.icon}
                    selected={selectedChains.includes(chain.id)}
                    onToggle={() => handleChainSelection(chain.id)}
                />
            ))}
            <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ margin: 2}}>
                Save Profile
            </Button>
        </MobileWrapper>
    );
};
