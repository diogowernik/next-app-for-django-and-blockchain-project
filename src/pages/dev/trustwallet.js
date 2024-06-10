import React, { useState, useEffect, useRef } from 'react';
import { useConnect, useAccount, useAccountEffect } from 'wagmi';

const TrustWalletOnlyApp = () => {
  const { connect, connectors, error } = useConnect();
  const { address, addresses, chain, chainId, connector, isConnecting, isConnected, isDisconnected, isReconnecting, status, error: accountError } = useAccount();
  const [isTrustWalletDisconnected, setIsTrustWalletDisconnected] = useState(false);
  const trustWalletConnector = connectors.find(connector => connector.id === 'com.trustwallet.app');

  const checkCountRef = useRef(null);

  const checkTrustWalletDisconnection = () => {
    const disconnectedStatus = localStorage.getItem('wagmi.com.trustwallet.app.disconnected');
    setIsTrustWalletDisconnected(disconnectedStatus ? disconnectedStatus === 'true' : false);
    if (++checkCountRef.current >= 10) { // Limite de 10 verificações
      clearInterval(checkCountRef.current);
      checkCountRef.current = null;
    }
  };
  console.log('isTrustWalletDisconnected:', isTrustWalletDisconnected);

  const startLimitedCheck = () => {
    clearInterval(checkCountRef.current); // Limpa qualquer intervalo existente antes de começar um novo
    checkCountRef.current = 0; // Reseta o contador
    checkCountRef.current = setInterval(checkTrustWalletDisconnection, 1000); // Verifica a cada segundo por 10 segundos
  };

  useEffect(() => {
    return () => clearInterval(checkCountRef.current); // Limpa o intervalo quando o componente é desmontado
  }, []);

  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data);
      startLimitedCheck();
    },
    onDisconnect() {
      console.log('Disconnected!');
      startLimitedCheck();
    },
  });

  const handleDisconnect = async () => {
    if (connector) {
      try {
        await connector.disconnect();
        console.log("Disconnected successfully.");
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    } else {
      console.log("No connector found to disconnect");
    }
  };

  return (
    <div>
      <h1>Trust Wallet Connect Test App</h1>
      {trustWalletConnector && (
        <button onClick={() => connect({ connector: trustWalletConnector })}>
          Connect with {trustWalletConnector.name}
        </button>
      )}
      {error && <div>Error: {error.message}</div>}
      
      {isConnected && !isTrustWalletDisconnected && (
        <div>
          <h2>Connected</h2>
          <p>Account: {address}</p>
          <p>Addresses: {addresses?.join(', ')}</p>
          <p>Chain ID: {chainId}</p>
          <p>Chain: {chain?.name}</p>
          <p>Connector: {connector?.name}</p>
          <p>ConnectorId: {connector?.id}</p>
          <p>Is Connected: {isConnected.toString()}</p>
          <p>Is Connecting: {isConnecting.toString()}</p>
          <p>Is Disconnected: {isDisconnected.toString()}</p>
          <p>Is Reconnecting: {isReconnecting.toString()}</p>
          <p>Status: {status}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}

      {(status === 'disconnected' || isTrustWalletDisconnected) && (
        <div>
          <h2>Disconnected</h2>
        </div>
      )}

      {status === 'connecting' && (
        <div>
          <h2>Connecting</h2>
        </div>
      )}

      {status === 'error' && (
        <div>
          <h2>Error</h2>
          <p>{accountError?.message}</p>
        </div>
      )}

      {status === 'reconnecting' && (
        <div>
          <h2>Reconnecting</h2>
        </div>
      )}
    </div>
  );
};

export default TrustWalletOnlyApp;
