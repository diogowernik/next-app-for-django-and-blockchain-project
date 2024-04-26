import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import { useDjangoAuth, useMetamaskDjangoRegister, useMetamaskDjangoLogin } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';

export default function Dashboard() {
    const { 
        metamaskIsAuthenticated, 
        metamaskConnect, 
        metamaskSignOut, 
        metamaskUserAddress
    } = useWalletManager();
    const { 
        djangoIsAuthenticated, 
        djangoSignOut 
    } = useDjangoAuth();
    const registerWithDjangoUsingMetamask = useMetamaskDjangoRegister();
    const loginWithDjangoUsingMetamask = useMetamaskDjangoLogin();

    return (
        <MainLayout>
            {/* MetaMask Authentication Section */}
            <div>
                <h2>MetaMask Authentication</h2>
                {metamaskIsAuthenticated ? (
                <>
                    <p>Conectado com MetaMask.</p>
                    <p>Endereço: {metamaskUserAddress}</p>
                    <button onClick={metamaskSignOut}>Desconectar MetaMask</button>
                </>
                ) : (
                <button onClick={metamaskConnect}>Conectar com MetaMask</button>
                )}
            </div>
            {/* Django Authentication Section */}
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
                                <button onClick={registerWithDjangoUsingMetamask}>Register with Django via MetaMask</button>
                                <br />
                                <button onClick={loginWithDjangoUsingMetamask}>Login with Django via MetaMask</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
