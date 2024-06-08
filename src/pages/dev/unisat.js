import { useEffect, useState } from "react";
import { BitcoinNetworkType } from "sats-connect";
import { useLocalStorage } from "@/hooks/auth/useLocalStorage";

const UnisatOnlyApp = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Inicialização com valores padrão condicionais para evitar problemas de renderização no servidor
  const [paymentAddress, setPaymentAddress] = useLocalStorage("btc_unisat_paymentAddress", "");
  const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage("btc_unisat_paymentPublicKey", "");
  const [ordinalsAddresses, setOrdinalsAddresses] = useLocalStorage("btc_unisat_ordinalsAddresses", []);
  const [ordinalsPublicKeys, setOrdinalsPublicKeys] = useLocalStorage("btc_unisat_ordinalsPublicKeys", []);
  const [network, setNetwork] = useLocalStorage("btc_unisat_network", BitcoinNetworkType.Testnet);
  const [unisatConnected, setUnisatConnected] = useLocalStorage("btc_unisat_connected", false); // Estado de conexão persistido
  const [unisatAccounts, setUnisatAccounts] = useState([]);

  useEffect(() => {
    setIsClient(true); // Sinaliza que o cliente está pronto
  }, []);

  useEffect(() => {
    // Verifica a disponibilidade da carteira Unisat somente no lado do cliente
    if (isClient) {
      const checkUnisatAvailability = async () => {
        let unisat = window.unisat;
        for (let i = 1; i < 10 && !unisat; i += 1) {
          await new Promise((resolve) => setTimeout(resolve, 100 * i));
          unisat = window.unisat;
        }
        setUnisatConnected(!!unisat); // Atualiza o estado de conexão com base na disponibilidade
      };

      checkUnisatAvailability();
    }
  }, [isClient, network]);

  const onWalletDisconnect = () => {
    setPaymentAddress(null);
    setPaymentPublicKey(null);
    setOrdinalsAddresses([]);
    setOrdinalsPublicKeys([]);
    setUnisatAccounts([]);
    setUnisatConnected(false); // Marca a carteira como desconectada
  };

  const toggleNetwork = () => {
    const newNetwork = network === BitcoinNetworkType.Testnet ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet;
    setNetwork(newNetwork);
    onWalletDisconnect(); // Desconecta ao trocar a rede
  };

  const onConnectClick = async () => {
    try {
      const result = await window.unisat.requestAccounts();
      handleAccountsChanged(result);
      setUnisatConnected(true); // Marca a carteira como conectada
    } catch (error) {
      console.log("Error connecting to Unisat:", error);
      setUnisatConnected(false);
    }
  };

  const handleAccountsChanged = (_accounts) => {
    if (_accounts.length > 0) {
      setOrdinalsAddresses(_accounts);
      getBasicInfo(_accounts);
      setUnisatAccounts(_accounts);
    }
  };

  const getBasicInfo = async (accounts) => {
    const unisat = window.unisat;
    const publicKeys = await Promise.all(accounts.map(() => unisat.getPublicKey()));
    setOrdinalsPublicKeys(publicKeys);
  };

  if (!isClient) {
    return null; // Não renderiza nada até que o cliente esteja pronto
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Sats Connect Test App - {network}</h1>
      <div>
        {unisatConnected && (
          <div>
            <h3>Unisat Accounts</h3>
            {unisatAccounts.map((account, index) => (
              <div key={index}>
                <div>Address: {account}</div>
                <div>Public Key: {ordinalsPublicKeys[index]}</div>
              </div>
            ))}
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
  Connect Unisat
</button>
      </div>
      <div>
        <button onClick={onWalletDisconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default UnisatOnlyApp;
