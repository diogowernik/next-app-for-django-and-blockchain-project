import { useEffect, useState } from "react";
import Web3 from 'web3';
import { useLocalStorage } from "@/hooks/auth/useLocalStorage";

const TrustWalletOnlyApp = () => {
  const [account, setAccount] = useLocalStorage("eth_trustwallet_account", null);
  const [network, setNetwork] = useLocalStorage("eth_trustwallet_network", "mainnet");
  const [trustConnected, setTrustConnected] = useLocalStorage("eth_trustwallet_connected", false);
  const [walletInstalled, setWalletInstalled] = useState(false);
  const [balance, setBalance] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marcar que estamos no cliente

    const checkWalletAvailability = async () => {
      if (typeof window.ethereum !== "undefined" && window.ethereum.isTrust) {
        setWalletInstalled(true);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          getBalance(accounts[0]);
          setTrustConnected(true);
        } else {
          setTrustConnected(false);
        }
      } else {
        setWalletInstalled(false);
        setTrustConnected(false);
      }
    };

    checkWalletAvailability();
  }, []);

  const onWalletDisconnect = () => {
    setAccount(null);
    setBalance(null);
    setTrustConnected(false);
    window.localStorage.removeItem("eth_trustwallet_account");
    window.localStorage.removeItem("eth_trustwallet_network");
  };

  const toggleNetwork = async () => {
    if (window.ethereum && window.ethereum.isTrust) {
      const newNetwork = network === "mainnet" ? "sepolia" : "mainnet";
      setNetwork(newNetwork);
      window.localStorage.setItem("eth_trustwallet_network", JSON.stringify(newNetwork));
      if (newNetwork === "sepolia") {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        });
      } else {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      }
      onWalletDisconnect();
    }
  };

  const onConnectClick = async () => {
    if (window.ethereum && window.ethereum.isTrust) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        getBalance(accounts[0]);
        setTrustConnected(true);
        window.localStorage.setItem("eth_trustwallet_account", accounts[0]);
      }
    } else {
      console.log("Trust Wallet is not installed");
    }
  };

  const getBalance = async (account) => {
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(account);
    setBalance(web3.utils.fromWei(balance, 'ether'));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Trust Wallet Connect Test App - {network}</h1>
      <div>
        {trustConnected ? (
          <div>
            <h3>Trust Wallet Account</h3>
            <div>Address: {account}</div>
            <div>Balance: {balance} ETH</div>
          </div>
        ) : (
          <div>
            <h3>No account connected</h3>
          </div>
        )}
      </div>
      <div style={{ background: "lightgray", padding: 30, marginTop: 10 }}>
        <button style={{ height: 30, width: 180 }} onClick={toggleNetwork}>
          Switch Network
        </button>
        <br />
        <br />
        <button style={{ height: 30, width: 180, marginLeft: 10 }} onClick={onConnectClick}>
          Connect Trust Wallet
        </button>
      </div>
      <div>
        <button onClick={onWalletDisconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default TrustWalletOnlyApp;
