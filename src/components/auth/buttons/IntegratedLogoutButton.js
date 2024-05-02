import React from 'react';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const IntegratedLogoutButton = () => {
    const { djangoSignOut, metamaskSignOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // Desconecta primeiro do MetaMask
            await metamaskSignOut(); // Garantir que esta função é assíncrona ou retorna uma Promise

            // Depois que o MetaMask estiver desconectado, prossegue para o logout do Django
            await djangoSignOut(); // Garantir que esta função é assíncrona ou retorna uma Promise
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <button onClick={handleLogout}>Logout from All</button>;
};

export default IntegratedLogoutButton;
