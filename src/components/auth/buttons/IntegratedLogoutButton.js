import React from 'react';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const IntegratedLogoutButton = () => {
    const { djangoSignOut, metamaskSignOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // Desconecta primeiro do MetaMask
            metamaskSignOut();

            // Define um timer para desconectar do Django após um curto atraso
            setTimeout(async () => {
                await djangoSignOut();
            }, 2000);  // Atraso de 2000 milissegundos (2 segundos)
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <button onClick={handleLogout}>Logout from All</button>;
};

export default IntegratedLogoutButton;
