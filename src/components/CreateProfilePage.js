// CreateProfilePage.js
import React, { useState } from 'react';
import NicknameInput from './NicknameInput';
import AvatarUpload from './AvatarUpload';
import DescriptionInput from './DescriptionInput';  // Assuma que você criará este componente
import CoinSelection from './CoinSelection';
import NetworkSelection from './NetworkSelection'; // Assuma que você também criará este componente baseado no CoinSelection
import SaveButton from './SaveButton'; // Assuma que este é um botão para salvar o perfil
import MobileWrapper from './MobileWrapper';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Estilização dos parágrafos
const StyledParagraph = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    color: theme.palette.text.primary,
    fontSize: '1rem',
}));

const coins = [
    { id: 'usdt', name: 'USDT', icon: '/icons/usdt.png' },
    { id: 'usdc', name: 'USDC', icon: '/icons/usdc.png' },
    { id: 'eth', name: 'ETH', icon: '/icons/eth.png' },
    { id: 'matic', name: 'MATIC', icon: '/icons/matic.png' },
    { id: 'bnb', name: 'BNB', icon: '/icons/bnb.png' },
];

const networks = [
    { id: 'bnb', name: 'BNB' , icon: '/icons/bnb.png' },
    { id: 'polygon', name: 'Polygon', icon: '/icons/polygon.png' },
    { id: 'ethereum', name: 'Ethereum', icon: '/icons/ethereum.png' },
];


const CreateProfilePage = () => {
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [selectedNetworks, setSelectedNetwork] = useState('');

    // Esta função pode ser expandida com lógica de API
    const handleSaveProfile = async () => {
        console.log(`Salvando perfil para o apelido: ${nickname}`);
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
            <AvatarUpload onAvatarChange={setAvatar} />
            <NicknameInput nickname={nickname} setNickname={setNickname} />
            <DescriptionInput description={description} setDescription={setDescription} />
            <Typography variant="h6" style={{ alignSelf: 'center', margin: '15px' }}>Quais moedas voce aceita?</Typography>
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
                Quais Redes voce utiliza?
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
            <SaveButton onClick={handleSaveProfile} />
        </MobileWrapper>
    );
};

export default CreateProfilePage;
