import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/layouts/MainLayout';

export default function Dashboard() {
    const { 
        metamaskIsAuthenticated, 
        metamaskConnect, 
        metamaskSignOut, 
        metamaskUserAddress
    } = useAuth();

    // Adicione este useEffect para reagir às mudanças de autenticação
    useEffect(() => {
        console.log('O status de autenticação mudou:', metamaskIsAuthenticated);
    }, [metamaskIsAuthenticated]);

    return (
        <MainLayout>
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
        </MainLayout>
    );
}
