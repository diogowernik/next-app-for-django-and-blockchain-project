import React, { useState, useEffect } from 'react';
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  getCapabilities,
  request,
} from "sats-connect";
import useLocalStorage from './useLocalStorage';  // Asumindo que useLocalStorage é compatível

function WalletManager() {
  const [paymentAddress, setPaymentAddress] = useLocalStorage("paymentAddress");
  const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage("paymentPublicKey");
  const [ordinalsAddress, setOrdinalsAddress] = useLocalStorage("ordinalsAddress");
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useLocalStorage("ordinalsPublicKey");
  const [stacksAddress, setStacksAddress] = useLocalStorage("stacksAddress");
  const [network, setNetwork] = useLocalStorage("network", BitcoinNetworkType.Testnet);
  const [capabilities, setCapabilities] = useState(new Set());
  const [capabilityState, setCapabilityState] = useState("loading");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkCapabilities = async () => {
      setCapabilityState("loading");
      try {
        await getCapabilities({
          payload: { network: { type: network } },
          onFinish: response => {
            setCapabilities(new Set(response));
            setCapabilityState("loaded");
          },
          onCancel: () => {
            setCapabilityState("cancelled");
          }
        });
      } catch (error) {
        console.error("Error loading capabilities:", error);
        setCapabilityState("missing");
      }
    };

    checkCapabilities();
  }, [network]);

  useEffect(() => {
    const connect = async () => {
      try {
        const response = await getAddress({
          payload: {
            purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals, AddressPurpose.Stacks],
            network: { type: network },
          }
        });
        if (response.status === 'success') {
          setPaymentAddress(response.addresses.find(a => a.purpose === AddressPurpose.Payment)?.address);
          setPaymentPublicKey(response.addresses.find(a => a.purpose === AddressPurpose.Payment)?.publicKey);
          setOrdinalsAddress(response.addresses.find(a => a.purpose === AddressPurpose.Ordinals)?.address);
          setOrdinalsPublicKey(response.addresses.find(a => a.purpose === AddressPurpose.Ordinals)?.publicKey);
          setStacksAddress(response.addresses.find(a => a.purpose === AddressPurpose.Stacks)?.address);
          setIsReady(true);
          console.log("Wallet connected: ", paymentAddress);
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    };

    if (!isReady) {
      connect();
    }
  }, [network]);

  return (
    <div>
      <h1>Wallet Manager</h1>
      {isReady ? (
        <div>
          <div>Payment Address: {paymentAddress}</div>
          <div>Ordinals Address: {ordinalsAddress}</div>
          <div>Stacks Address: {stacksAddress}</div>
        </div>
      ) : (
        <div>Connecting to wallet...</div>
      )}
    </div>
  );
}

export default WalletManager;
