import { useEffect, useMemo, useState } from "react";
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  getCapabilities,
  getProviders,
} from "sats-connect";
import axios from "axios";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  };

  return [storedValue, setValue];
};

const UnisatOnlyApp = () => {
  const [paymentAddress, setPaymentAddress] = useLocalStorage("paymentAddress");
  const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage("paymentPublicKey");
  const [ordinalsAddress, setOrdinalsAddress] = useLocalStorage("ordinalsAddress");
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useLocalStorage("ordinalsPublicKey");
  const [network, setNetwork] = useLocalStorage("network", BitcoinNetworkType.Testnet);
  const [capabilityState, setCapabilityState] = useState("loading");
  const [capabilities, setCapabilities] = useState(new Set());
  const providers = useMemo(() => (typeof window !== "undefined" ? getProviders() : []), []);
  const [walletType, setWalletType] = useState(0); // 0: None, 1: XVerse, 2: Unisat
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [unisatAccounts, setUnisatAccounts] = useState([]);
  const [xverseAccounts, setXverseAccounts] = useState([]);

  useEffect(() => {
    const checkUnisatAvailability = async () => {
      let unisat = window.unisat;
      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = window.unisat;
      }
      setUnisatInstalled(!!unisat);
    };

    const checkXVerseAvailability = async () => {
      let runs = 0;
      const MAX_RUNS = 20;
      setCapabilityState("loading");
      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish(response) {
              setCapabilities(new Set(response));
              setCapabilityState("loaded");
            },
            onCancel() {
              setCapabilityState("cancelled");
            },
            payload: {
              network: { type: network },
            },
          });
          break;
        } catch (e) {
          runs++;
          if (runs === MAX_RUNS) {
            setCapabilityState("missing");
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    if (typeof window !== "undefined") {
      checkUnisatAvailability();
      checkXVerseAvailability();
    }
  }, [network]);

  const onWalletDisconnect = () => {
    setPaymentAddress(undefined);
    setPaymentPublicKey(undefined);
    setOrdinalsAddress(undefined);
    setOrdinalsPublicKey(undefined);
    setWalletType(0);
    setUnisatAccounts([]);
    setXverseAccounts([]);
  };

  const toggleNetwork = () => {
    setNetwork(
      network === BitcoinNetworkType.Testnet
        ? BitcoinNetworkType.Mainnet
        : BitcoinNetworkType.Testnet
    );
    onWalletDisconnect();
  };

  const onConnectClick = async (walletType) => {
    if (walletType === 1) {
      await getAddress({
        payload: {
          purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
          message: "Connect With BRC20 Claim",
          network: {
            type: network,
          },
        },
        onFinish: (response) => {
          const paymentAddressItem = response.addresses.find(
            (address) => address.purpose === AddressPurpose.Payment
          );
          setPaymentAddress(paymentAddressItem?.address);
          setPaymentPublicKey(paymentAddressItem?.publicKey);

          const ordinalsAddressItem = response.addresses.find(
            (address) => address.purpose === AddressPurpose.Ordinals
          );
          setOrdinalsAddress(ordinalsAddressItem?.address);
          setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);
          setXverseAccounts(response.addresses);
          setWalletType(1);
        },
        onCancel: () => alert("Request canceled"),
      });
    } else if (walletType === 2) {
      try {
        const result = await window.unisat.requestAccounts();
        handleAccountsChanged(result);
        setWalletType(2);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAccountsChanged = (_accounts) => {
    if (_accounts.length > 0) {
      setOrdinalsAddress(_accounts[0]);
      getBasicInfo();
      setUnisatAccounts(_accounts);
    }
  };

  const getBasicInfo = async () => {
    const unisat = window.unisat;
    const [address] = await unisat.getAccounts();
    setOrdinalsAddress(address);

    const publicKey = await unisat.getPublicKey();
    setOrdinalsPublicKey(publicKey);
  };

  const capabilityMessage =
    capabilityState === "loading"
      ? "Checking capabilities..."
      : capabilityState === "cancelled"
      ? "Capability check cancelled by wallet. Please refresh the page and try again."
      : capabilityState === "missing"
      ? "Could not find an installed Sats Connect capable wallet. Please install a wallet and try again."
      : !capabilities
      ? "Something went wrong with getting capabilities"
      : undefined;

  return (
    <div style={{ padding: 30 }}>
      <h1>Sats Connect Test App - {network}</h1>
      {capabilityMessage ? (
        <div>{capabilityMessage}</div>
      ) : (
        <>
          <div>
            {walletType === 1 && xverseAccounts.length > 0 && (
              <div>
                <h3>XVerse Accounts</h3>
                {xverseAccounts.map((account, index) => (
                  <div key={index}>
                    <div>Address: {account.address}</div>
                    <div>Purpose: {account.purpose}</div>
                  </div>
                ))}
              </div>
            )}
            {walletType === 2 && unisatAccounts.length > 0 && (
              <div>
                <h3>Unisat Accounts</h3>
                {unisatAccounts.map((account, index) => (
                  <div key={index}>
                    <div>Address: {account}</div>
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
            <button style={{ height: 30, width: 180 }} onClick={() => onConnectClick(1)}>
              Connect XVerse
            </button>
            <button style={{ height: 30, width: 180, marginLeft: 10 }} onClick={() => onConnectClick(2)}>
              Connect Unisat
            </button>
          </div>
          <div>
            <button onClick={onWalletDisconnect}>Disconnect</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
