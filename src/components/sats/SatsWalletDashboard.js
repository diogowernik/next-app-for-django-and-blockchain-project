// @/components/sats/SatsWalletDashboard.js

import React, { useEffect, useState } from "react";
import { satsManager } from "@/services/wallets";
import SendBitcoin from "@/components/sats/SendBitcoin";

export const SatsWalletDashboard = () => {
  const [network, setNetwork] = useState(satsManager.network);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("Network state initialized to:", network);
    // Attempt to reconnect on app start if already connected before
    if (satsManager.isReady) {
      setIsReady(true);
    }
  }, [network]);

  const onWalletDisconnect = () => {
    satsManager.disconnect();
    setIsReady(false);
  };

  const toggleNetwork = () => {
    const newNetwork = network === "testnet" ? "mainnet" : "testnet";
    satsManager.network = newNetwork;
    setNetwork(newNetwork);
    onWalletDisconnect();
  };

  
  const onConnectClick = async () => {
    try {
      await satsManager.connect();
      setIsReady(true);
    } catch (error) {
      console.error('Failed to connect:', error.message);
      alert(`Connection failed: ${error.message}`);
    }
  };

  if (!isReady) {
    return (
      <div style={{ padding: 30 }}>
        <h1>Sats Connect Test App - {network}</h1>
        <div>Please connect your wallet to continue</div>
        <div style={{ background: "lightgray", padding: 30, marginTop: 10 }}>
          <button style={{ height: 30, width: 180 }} onClick={toggleNetwork}>
            Switch Network
          </button>
          <br /><br />
          <button style={{ height: 30, width: 180 }} onClick={onConnectClick}>
            Connect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Sats Connect Test App - {network}</h1>
      <div>
        <div>Payment Address: {satsManager.paymentAddress}</div>
        <div>Payment PubKey: {satsManager.paymentPublicKey}</div>
        <br />

        <div className="container">
          <h3>Disconnect wallet</h3>
          <button onClick={onWalletDisconnect}>Disconnect</button>
        </div>
        <div className="container">
          <h3>Get Wallet Info</h3>
          <button onClick={() => alert("Currently unavailable")}>
            Request Info
          </button>
        </div>

        <SendBitcoin
          address={satsManager.paymentAddress}
          network={network}
          capabilities={satsManager.capabilities}
        />
      </div>
    </div>
  );
};

