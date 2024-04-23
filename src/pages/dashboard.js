// @/pages/dashboard.js

import React, { useContext } from 'react';
import { useWalletManager } from '@/context/MetamaskContext';
import DjangoAuthContext from '@/context/DjangoContext';
import MainLayout from '@/layouts/MainLayout';

export default function Dashboard() {
  const { isAuthenticated: isMetaMaskAuthenticated, connectWithMetamask, signOut: signOutMetaMask, userAddress, balance, chainId } = useWalletManager();
  const { isAuthenticated: isDjangoAuthenticated, signOut: signOutDjango } = useContext(DjangoAuthContext);

  return (
    <MainLayout>
      <h1>Dashboard</h1>
      {/* MetaMask Authentication Section */}
      <div>
        <h2>MetaMask Authentication</h2>
        {isMetaMaskAuthenticated ? (
          <>
            <p>Conectado com MetaMask.</p>
            <p>Endereço: {userAddress}</p>
            <p>Saldo: {balance} ETH</p>
            <p>Rede: {chainId}</p>
            <button onClick={signOutMetaMask}>Desconectar MetaMask</button>
          </>
        ) : (
          <button onClick={connectWithMetamask}>Conectar com MetaMask</button>
        )}
      </div>
      {/* Django Authentication Section */}
      <div>
        <h2>Django Authentication</h2>
        {isDjangoAuthenticated ? (
          <>
            <p>Conectado com Django.</p>
            <button onClick={signOutDjango}>Desconectar Django</button>
          </>
        ) : (
          <p>Não está conectado com Django.</p>
          // O botão para conectar com Django poderia ser adicionado aqui se necessário
        )}
      </div>
    </MainLayout>
  );
}
