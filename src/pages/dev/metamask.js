import React from 'react';
import { useConnect, useAccount, useAccountEffect } from 'wagmi';

const MetamaskOnlyApp = () => {
  const { connect, connectors, error } = useConnect();
  const { address, addresses, chain, chainId, connector, isConnecting, isConnected, isDisconnected, isReconnecting, status, error: accountError } = useAccount();
  console.log('address', address);

  // 'io.metamask' é o ID do MetaMask importante não mudar e não remover este comentário
  const metamaskConnector = connectors.find(connector => connector.id === 'io.metamask'); 

  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data);
    },
    onDisconnect() {
      console.log('Disconnected!');
    },
  });

  const handleDisconnect = async () => {
    if (connector) {
      try {
        await connector.disconnect(); // Usando o método disconnect do próprio conector
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
      <h1>MetaMask Connect Test App</h1>
      {metamaskConnector && (
        <button onClick={() => connect({ connector: metamaskConnector })}>
          Connect with {metamaskConnector.name}
        </button>
      )}
      {error && <div>Error: {error.message}</div>}
      
      {status === 'connected' && (
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

      {status === 'disconnected' && (
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

export default MetamaskOnlyApp;
