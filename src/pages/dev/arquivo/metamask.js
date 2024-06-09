import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useLocalStorage } from "@/hooks/auth/useLocalStorage";

const MetamaskOnlyApp = () => {
  const [account, setAccount] = useLocalStorage("eth_metamask_account", null);
  const [network, setNetwork] = useLocalStorage("eth_metamask_network", "testnet");
  const [metamaskConnected, setMetamaskConnected] = useLocalStorage("eth_metamask_connected", false);
  
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [balance, setBalance] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marcar que estamos no cliente

    const checkMetamaskAvailability = async () => {
      if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask) {
        setMetamaskInstalled(true);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          getBalance(accounts[0]);
          setMetamaskConnected(true);
        } else {
          setMetamaskConnected(false);
        }
      } else {
        setMetamaskInstalled(false);
        setMetamaskConnected(false);
      }
    };

    checkMetamaskAvailability();
  }, []);

  const onWalletDisconnect = () => {
    setAccount(null);
    setBalance(null);
    setMetamaskConnected(false);
    window.localStorage.removeItem("eth_metamask_account");
    window.localStorage.removeItem("eth_metamask_network");
  };

  const toggleNetwork = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const newNetwork = network === "mainnet" ? "sepolia" : "mainnet";
      setNetwork(newNetwork);
      window.localStorage.setItem("eth_metamask_network", JSON.stringify(newNetwork));
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
    if (window.ethereum && window.ethereum.isMetaMask) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        getBalance(accounts[0]);
        setMetamaskConnected(true);
        window.localStorage.setItem("eth_metamask_account", accounts[0]);
      }
    } else {
      console.log("MetaMask is not installed");
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
      <h1>MetaMask Connect Test App - {network}</h1>
      <div>
        {metamaskConnected ? (
          <div>
            <h3>MetaMask Account</h3>
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
          Connect MetaMask
        </button>
      </div>
      <div>
        <button onClick={onWalletDisconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default MetamaskOnlyApp;
