import React, { useContext } from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import DjangoAuthContext from '@/context/DjangoContext';
import MainLayout from '@/layouts/MainLayout';

export default function MetamaskRegister() {
    const { 
        userAddress, 
        isAuthenticated: isMetaMaskAuthenticated, 
        connectWithMetamask, 
        signOut: signOutMetaMask 
    } = useWalletManager();
    const { 
        registerWithMetamask, 
        isAuthenticated: isDjangoAuthenticated, 
        signOut: signOutDjango,
        loginWithMetamask 
    } = useContext(DjangoAuthContext);

    const requestSignature = async (message) => {
        try {
            return await window.ethereum.request({
                method: 'personal_sign',
                params: [message, userAddress],
            });
        } catch (error) {
            console.error("Error obtaining signature:", error);
            return null;
        }
    };

    const handleRegisterWithDjangoUsingMetamask = async () => {
        if (!isMetaMaskAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your registration.";
        const signature = await requestSignature(message);
        if (!signature) return;

        const result = await registerWithMetamask(userAddress, signature);
        if (result) {
            console.log("Registration response:", result.message);
        } else {
            console.log("Registration failed with no response from server");
        }
    };

    const handleLoginWithDjangoUsingMetamask = async () => {
        if (!isMetaMaskAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your identity.";
        const signature = await requestSignature(message);
        if (!signature) return;

        await loginWithMetamask(userAddress, signature);
    };

    return (
        <MainLayout>
            <h1>MetaMask Registration</h1>
            <div>
                <h2>MetaMask Authentication</h2>
                {isMetaMaskAuthenticated ? (
                    <>
                        <p>Connected with MetaMask. Wallet: {userAddress}</p>
                        <button onClick={signOutMetaMask}>Disconnect MetaMask</button>
                    </>
                ) : (
                    <button onClick={connectWithMetamask}>Connect with MetaMask</button>
                )}
            </div>
            <div>
                <h2>Django Authentication</h2>
                {isDjangoAuthenticated ? (
                    <>
                        <p>Connected with Django.</p>
                        <button onClick={signOutDjango}>Disconnect Django</button>
                    </>
                ) : (
                    <>
                        <p>Not connected with Django.</p>
                        {isMetaMaskAuthenticated && (
                            <>
                                <button onClick={handleRegisterWithDjangoUsingMetamask}>Register with Django via MetaMask</button>
                                <br />
                                <button onClick={handleLoginWithDjangoUsingMetamask}>Login with Django via MetaMask</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
