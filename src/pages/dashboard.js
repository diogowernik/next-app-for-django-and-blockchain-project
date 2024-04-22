// src/pages/dashboard.js

import React, { useContext } from 'react';
import { useMetamaskAuth } from '@/context/MetamaskAuthContext';
import DjangoAuthContext from '@/context/DjangoAuthContext';
import MainLayout from '@/layouts/MainLayout';

export default function Dashboard() {
  const { isAuthenticated: isMetaMaskAuthenticated, connectWithMetamask, signOut: signOutMetaMask } = useMetamaskAuth();
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
