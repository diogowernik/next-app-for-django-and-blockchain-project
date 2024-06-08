import { useEffect, useState } from "react";
import { AddressPurpose, BitcoinNetworkType, getAddress } from "sats-connect";
import { useLocalStorage } from "@/hooks/auth/useLocalStorage";

const XverseOnlyApp = () => {
  const [paymentAddress, setPaymentAddress] = useLocalStorage("btc_xverse_paymentAddress", null);
  const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage("btc_xverse_paymentPublicKey", null);
  const [ordinalsAddresses, setOrdinalsAddresses] = useLocalStorage("btc_xverse_ordinalsAddresses", []);
  const [ordinalsPublicKeys, setOrdinalsPublicKeys] = useLocalStorage("btc_xverse_ordinalsPublicKeys", []);

  const [network, setNetwork] = useLocalStorage("btc_xverse_network", BitcoinNetworkType.Testnet); // Default to Testnet
  const [walletConnected, setWalletConnected] = useLocalStorage("btc_xverse_connected", false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marcar que estamos no cliente
  }, []);

  useEffect(() => {
    // Check wallet connection on load
    if (walletConnected) {
      // Optionally re-fetch wallet details or just set as connected
      console.log("Wallet previously connected");
    }
  }, [walletConnected]);

  const onWalletDisconnect = () => {
    setPaymentAddress(null);
    setPaymentPublicKey(null);
    setOrdinalsAddresses([]);
    setOrdinalsPublicKeys([]);
    setWalletConnected(false);
    console.log("Wallet disconnected");
  };

  const toggleNetwork = () => {
    const newNetwork = network === BitcoinNetworkType.Testnet ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet;
    setNetwork(newNetwork);
    onWalletDisconnect(); // Consider if you want to disconnect on network toggle
    console.log("Network switched to:", newNetwork);
  };

  const onConnectClick = async () => {
    try {
      await getAddress({
        payload: {
          purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
          message: "Connect With Xverse",
          network: {
            type: network,
          },
        },
        onFinish: (response) => {
          const paymentAddressItem = response.addresses.find(
            (address) => address.purpose === AddressPurpose.Payment
          );
          const ordinalsAddressItem = response.addresses.find(
            (address) => address.purpose === AddressPurpose.Ordinals
          );
          setPaymentAddress(paymentAddressItem?.address);
          setPaymentPublicKey(paymentAddressItem?.publicKey);
          setOrdinalsAddresses(ordinalsAddressItem ? [ordinalsAddressItem.address] : []);
          setOrdinalsPublicKeys(ordinalsAddressItem ? [ordinalsAddressItem.publicKey] : []);
          setWalletConnected(true);
          console.log("Wallet connected");
        },
        onCancel: () => alert("Connection Request Canceled"),
      });
    } catch (error) {
      console.log("Error connecting to wallet:", error);
    }
  };

  if (!isClient) {
    return null; // Render nothing until we are on the client
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Sats Connect Test App - {network}</h1>
      <div>
        {walletConnected && (
          <div>
            <h3>Xverse Accounts</h3>
            <div>Payment Address: {paymentAddress}</div>
            <div>Payment PubKey: {paymentPublicKey}</div>
            {ordinalsAddresses.map((address, index) => (
              <div key={index}>
                <div>Ordinals Address: {address}</div>
                <div>Ordinals PubKey: {ordinalsPublicKeys[index]}</div>
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
  Connect Xverse
</button>

      </div>
      <div>
        <button onClick={onWalletDisconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default XverseOnlyApp;
