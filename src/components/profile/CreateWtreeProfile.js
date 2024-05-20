// CreateProfileProfile.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import UsernameInput from './form/UsernameInput';
import AvatarUpload from './form/AvatarUpload';
import DescriptionInput from './form/DescriptionInput';  
import CryptoSelection from './form/CryptoSelection';
import NetworkSelection from './form/NetworkSelection'; 
import MobileWrapper from './form/MobileWrapper';

// simulação no caso talvez tenha que mudar para comunicar com api e contract. Native e Token
const cryptos = [
    { id: 'usdt', name: 'USDT (Theter)', icon: '/icons/usdt.png' },
    { id: 'usdc', name: 'USDC (USD Coin)', icon: '/icons/usdc.png' },
    { id: 'eth', name: 'ETH (Ethereum)', icon: '/icons/eth.png' },
    { id: 'matic', name: 'MATIC (Polygon)', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB (Bincance Coin)', icon: '/icons/bnb.png' },
];

// será que vale a pena mudar o nome para networks?
const networks = [
    { id: 'ethereum', name: 'Ethereum (Ethereum Chain)', icon: '/icons/eth.png' },
    { id: 'polygon', name: 'Polygon (Matic)', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB (Binance Smart Chain)' , icon: '/icons/bnb.png' },
    
];

export const CreateWtreeProfile = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCryptos, setSelectedCryptos] = useState([]);
    const [selectedNetworks, setSelectedNetwork] = useState('');

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
    const handleNetworkSelection = (networkId) => {
        if (selectedNetworks.includes(networkId)) {
            setSelectedNetwork(selectedNetworks.filter(id => id !== networkId));
        }
        else {
            setSelectedNetwork([...selectedNetworks, networkId]);
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
                Which Blockchain Do You Use?
            </Typography>
            {networks.map(network => (
                <NetworkSelection
                    key={network.id}
                    network={network.name}
                    icon={network.icon}
                    selected={selectedNetworks.includes(network.id)}
                    onToggle={() => handleNetworkSelection(network.id)}
                />
            ))}
            <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ margin: 2}}>
                Save Profile
            </Button>
        </MobileWrapper>
    );
};
