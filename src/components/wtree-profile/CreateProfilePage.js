// CreateProfilePage.js
import React, { useState } from 'react';
import UsernameInput from './UsernameInput';
import AvatarUpload from './AvatarUpload';
import DescriptionInput from './DescriptionInput';  // Assuma que você criará este componente
import CoinSelection from './CoinSelection';
import NetworkSelection from './NetworkSelection'; // Assuma que você também criará este componente baseado no CoinSelection
import MobileWrapper from './MobileWrapper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

const coins = [
    { id: 'usdt', name: 'USDT (Theter)', icon: '/icons/usdt.png' },
    { id: 'usdc', name: 'USDC (USD Coin)', icon: '/icons/usdc.png' },
    { id: 'eth', name: 'ETH (Ethereum)', icon: '/icons/eth.png' },
    { id: 'matic', name: 'MATIC (Polygon)', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB (Bincance Coin)', icon: '/icons/bnb.png' },
];

const networks = [
    { id: 'ethereum', name: 'Ethereum (Ethereum Network)', icon: '/icons/eth.png' },
    { id: 'polygon', name: 'Polygon (Matic)', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB (Binance Smart Chain)' , icon: '/icons/bnb.png' },
    
];

const CreateProfilePage = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [selectedNetworks, setSelectedNetwork] = useState('');

    // Esta função pode ser expandida com lógica de API
    const handleSaveProfile = async () => {
        console.log(`Salvando perfil para o apelido: ${username}`);
    };
    const handleCoinSelection = (coinId) => {
        if (selectedCoins.includes(coinId)) {
            setSelectedCoins(selectedCoins.filter(id => id !== coinId));
        } else {
            setSelectedCoins([...selectedCoins, coinId]);
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
            {coins.map(coin => (
                <CoinSelection
                    key={coin.id}
                    coin={coin.name}
                    icon={coin.icon}
                    selected={selectedCoins.includes(coin.id)}
                    onToggle={() => handleCoinSelection(coin.id)}
                />
            ))}
            <Typography variant="h6" style={{ alignSelf: 'center', margin: '15px' }}>
                Which Networks Do You Use?
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

export default CreateProfilePage;
