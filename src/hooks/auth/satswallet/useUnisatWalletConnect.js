import { useState, useEffect } from "react";
import { AddressPurpose, getAddress } from "sats-connect";

export const useUnisatWalletConnect = (network, setAddressFunctions) => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  // Funções para definir endereços e chaves públicas, vindas de setAddressFunctions
  const {
    setPaymentAddress,
    setPaymentPublicKey,
    setOrdinalsAddress,
    setOrdinalsPublicKey,
    setStacksAddress
  } = setAddressFunctions;

  useEffect(() => {
    const checkUnisatAvailability = async () => {
      let unisat = window.unisat;
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = window.unisat;
      }
      setUnisatInstalled(!!unisat);
    };

    checkUnisatAvailability();
  }, []);

  const connectWallet = async () => {
    if (!unisatInstalled) {
      setError("Unisat Wallet is not installed");
      return [];
    }

    try {
      const result = await window.unisat.requestAccounts();
      setAccounts(result);
      return result;
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  const onConnectClick = async () => {
    if (!unisatInstalled) {
      setError("Unisat Wallet is not installed");
      return;
    }
  
    try {
      const response = await window.unisat.getAddress({
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
        message: "SATS Connect Demo",
        network: { type: network },
      });
  
      const paymentAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Payment);
      setPaymentAddress(paymentAddressItem?.address);
      setPaymentPublicKey(paymentAddressItem?.publicKey);
  
      const ordinalsAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Ordinals);
      setOrdinalsAddress(ordinalsAddressItem?.address);
      setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);
  
      const stacksAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Stacks);
      setStacksAddress(stacksAddressItem?.address);
    } catch (error) {
      setError("Failed to connect with Unisat Wallet using SATS Connect");
      console.error(error);
    }
  };
  

  return { unisatInstalled, accounts, error, connectWallet, onConnectClick };
};
