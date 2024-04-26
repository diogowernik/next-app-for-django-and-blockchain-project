import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import { useDjangoAuth, useMetamaskDjangoLogin } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';

export default function Dashboard() {
    const { metamaskIsAuthenticated, metamaskConnect, metamaskUserAddress} = useWalletManager();
    const { djangoIsAuthenticated} = useDjangoAuth();
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
                    </>
                ) : (
                    <>
                        <p>Not connected with Django.</p>
                        {metamaskIsAuthenticated && (
                            <>
                                <button onClick={loginWithDjangoUsingMetamask}>Login with Django via MetaMask</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
