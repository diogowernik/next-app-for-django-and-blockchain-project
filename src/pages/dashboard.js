// @/pages/dashboard.js

import React from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import { useDjangoAuth } from '@/hooks';  // Atualizado para usar o hook customizado
import MainLayout from '@/layouts/MainLayout';

export default function Dashboard() {
  const {
    metamaskIsAuthenticated,
    metamaskConnect,
    metamaskSignOut,
    metamaskUserAddress,
    metamaskBalance,
    metamaskChainId
  } = useWalletManager();

  const {
    djangoIsAuthenticated,
    djangoSignOut
  } = useDjangoAuth();

  return (
    <MainLayout>
      <h1>Dashboard</h1>
      {/* MetaMask Authentication Section */}
      <div>
        <h2>MetaMask Authentication</h2>
        {metamaskIsAuthenticated ? (
          <>
            <p>Conectado com MetaMask.</p>
            <p>Endereço: {metamaskUserAddress}</p>
            <p>Saldo: {metamaskBalance} ETH</p>
            <p>Rede: {metamaskChainId}</p>
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
            <p>Conectado com Django.</p>
            <button onClick={djangoSignOut}>Desconectar Django</button>
          </>
        ) : (
          <p>Não está conectado com Django.</p>
          // O botão para conectar com Django poderia ser adicionado aqui se necessário
        )}
      </div>
    </MainLayout>
  );
}
