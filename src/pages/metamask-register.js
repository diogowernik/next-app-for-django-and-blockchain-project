import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import { useDjangoAuth } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';

export default function MetamaskRegister() {
    const { 
        metamaskIsAuthenticated,
        metamaskConnect,
        metamaskSignOut,
        metamaskUserAddress,
        metamaskBalance,
        metamaskChainId
    } = useWalletManager();

    const { 
        djangoRegisterWithMetamask,
        djangoIsAuthenticated,
        djangoSignOut,
        djangoLoginWithMetamask
    } = useDjangoAuth();

    const requestSignature = async (message) => {
        try {
            return await window.ethereum.request({
                method: 'personal_sign',
                params: [message, metamaskUserAddress],
            });
        } catch (error) {
            console.error("Error obtaining signature:", error);
            return null;
        }
    };

    const handleRegisterWithDjangoUsingMetamask = async () => {
        if (!metamaskIsAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your registration.";
        const signature = await requestSignature(message);
        if (!signature) return;

        const result = await djangoRegisterWithMetamask(metamaskUserAddress, signature);
        if (result) {
            console.log("Registration response:", result.message);
        } else {
            console.log("Registration failed with no response from server");
        }
    };

    const handleLoginWithDjangoUsingMetamask = async () => {
        if (!metamaskIsAuthenticated) {
            console.warn("Connect MetaMask first.");
            return;
        }

        const message = "Please sign this message to confirm your identity.";
        const signature = await requestSignature(message);
        if (!signature) return;

        await djangoLoginWithMetamask(metamaskUserAddress, signature);
    };

    return (
        <MainLayout>
            <h1>MetaMask Registration</h1>
            <div>
                <h2>MetaMask Authentication</h2>
                {metamaskIsAuthenticated ? (
                    <>
                        <p>Connected with MetaMask. Wallet: {metamaskUserAddress}</p>
                        <button onClick={metamaskSignOut}>Disconnect MetaMask</button>
                    </>
                ) : (
                    <button onClick={metamaskConnect}>Connect with MetaMask</button>
                )}
            </div>
            <div>
                <h2>Django Authentication</h2>
                {djangoIsAuthenticated ? (
                    <>
                        <p>Connected with Django.</p>
                        <button onClick={djangoSignOut}>Disconnect Django</button>
                    </>
                ) : (
                    <>
                        <p>Not connected with Django.</p>
                        {metamaskIsAuthenticated && (
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
