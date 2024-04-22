// pages/metamask-register.js

import React, { useContext } from 'react';
import { useMetamaskAuth } from '@/context/MetamaskAuthContext';
import DjangoAuthContext from '@/context/DjangoAuthContext';
import MainLayout from '@/layouts/MainLayout';

export default function MetamaskRegister() {
    const { userAddress, isAuthenticated: isMetaMaskAuthenticated, connectWithMetamask, signOut: signOutMetaMask } = useMetamaskAuth();
    const { registerWithMetamask, isAuthenticated: isDjangoAuthenticated, signOut: signOutDjango } = useContext(DjangoAuthContext);

    console.log("User address:", userAddress);

    const handleRegisterWithDjangoUsingMetamask = async () => {
        if (userAddress) {
            try {
                const message = "Please sign this message to confirm your registration.";
                const signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [message, userAddress],
                });

                console.log("Obtained signature:", signature);
                registerWithMetamask(userAddress, signature);
            } catch (error) {
                console.error("Error obtaining signature:", error);
            }
        } else {
            console.warn("User address not available. Connect MetaMask first.");
        }
    };

    return (
        <MainLayout>
            <h1>MetaMask Registration</h1>
            <div>
                <h2>MetaMask Authentication</h2>
                {isMetaMaskAuthenticated ? (
                    <>
                        <p>Conectado com MetaMask. Carteira: {userAddress}</p>
                        <button onClick={signOutMetaMask}>Desconectar MetaMask</button>
                    </>
                ) : (
                    <button onClick={connectWithMetamask}>Conectar com MetaMask</button>
                )}
            </div>
            <div>
                <h2>Django Authentication</h2>
                {isDjangoAuthenticated ? (
                    <>
                        <p>Conectado com Django.</p>
                        <button onClick={signOutDjango}>Desconectar Django</button>
                    </>
                ) : (
                    <>
                        <p>Não está conectado com Django.</p>
                        {isMetaMaskAuthenticated && (
                            <button onClick={handleRegisterWithDjangoUsingMetamask}>Registrar no Django via MetaMask</button>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
