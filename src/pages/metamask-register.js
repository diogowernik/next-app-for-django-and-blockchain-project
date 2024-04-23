// pages/metamask-register.js

import React, { useContext } from 'react';
import { useMetamaskAuth } from '@/context/MetamaskAuthContext';
import DjangoAuthContext from '@/context/DjangoAuthContext';
import MainLayout from '@/layouts/MainLayout';
// será que tem que importar o loginWithMetamask aqui?

export default function MetamaskRegister() {
    const { 
        userAddress, 
        isAuthenticated: isMetaMaskAuthenticated, 
        connectWithMetamask, signOut: signOutMetaMask 
    } = useMetamaskAuth();
    const { 
        registerWithMetamask, 
        isAuthenticated: isDjangoAuthenticated, 
        signOut: signOutDjango,
        loginWithMetamask // aqui que não tinha acabei de adicionar
    } = useContext(DjangoAuthContext);


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
            const result = await registerWithMetamask(userAddress, signature);
            console.log("Registration result:", result);

            // Se a resposta não for nula, processar de acordo com a mensagem de sucesso ou falha
            if (result) {
                console.log("Registration response:", result.message);  // Checar a mensagem recebida na resposta
            } else {
                console.log("Registration failed with no response from server");
            }
        } catch (error) {
            console.error("Error obtaining signature or registering:", error);
        }
    } else {
        console.warn("User address not available. Connect MetaMask first.");
    }
};

const handleLoginWithDjangoUsingMetamask = async () => {
    if (userAddress) {
        try {
        const message = "Please sign this message to confirm your identity.";
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, userAddress],
        });

        console.log("Obtained signature:", signature);
        await loginWithMetamask(userAddress, signature);
        } catch (error) {
        console.error("Error obtaining signature or during login:", error);
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
            {/* // adicionar um botão de login com o metamask no django. */}
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
                    {isMetaMaskAuthenticated && !isDjangoAuthenticated && (
                    <>
                        <button onClick={handleRegisterWithDjangoUsingMetamask}>Registrar no Django via MetaMask</button>
                        <br />
                        <button onClick={handleLoginWithDjangoUsingMetamask}>Login no Django via MetaMask</button>
                    </>
                    )}

                    </>
                )}
                </div>
            
        </MainLayout>
    );
}
