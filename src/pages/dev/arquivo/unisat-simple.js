import React, { useState } from "react";
import {useUnisatWalletConnect} from "@/hooks/auth/satswallet/useUnisatWalletConnectSimple";

const UnisatDashboard = () => {
  const { unisatInstalled, accounts, error, connectWallet } = useUnisatWalletConnect();
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  const handleConnect = async () => {
    const newAccounts = await connectWallet();
    setConnectedAccounts(newAccounts);
  };

  return (
    <div>
      <h1>Sats Dashboard</h1>
      <div>
        <button onClick={handleConnect}>Connect Unisat</button>
      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div>
        <h2>Connected Accounts</h2>
        <ul>
          {connectedAccounts.length > 0 ? (
            connectedAccounts.map((account, index) => (
              <li key={index}>{account}</li>
            ))
          ) : (
            <li>No accounts connected</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UnisatDashboard;
