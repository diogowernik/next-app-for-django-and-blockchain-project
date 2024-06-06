import { useEffect, useMemo, useState } from "react";
import { AddressPurpose, BitcoinNetworkType, getAddress, getCapabilities, getProviders, request } from "sats-connect";

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

const App = () => {
  const [paymentAddress, setPaymentAddress] = useLocalStorage("paymentAddress");
  const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage("paymentPublicKey");
  const [ordinalsAddress, setOrdinalsAddress] = useLocalStorage("ordinalsAddress");
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useLocalStorage("ordinalsPublicKey");
  const [stacksAddress, setStacksAddress] = useLocalStorage("stacksAddress");
  const [stacksPublicKey, setStacksPublicKey] = useLocalStorage("stacksPublicKey");
  const [network, setNetwork] = useLocalStorage("network", BitcoinNetworkType.Testnet);
  const [capabilityState, setCapabilityState] = useState("loading");
  const [capabilities, setCapabilities] = useState(new Set());
  const providers = useMemo(() => (typeof window !== "undefined" ? getProviders() : []), []);

  useEffect(() => {
    console.log("Network state initialized to:", network);
  }, [network]);

  useEffect(() => {
    const runCapabilityCheck = async () => {
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

    runCapabilityCheck();
  }, [network]);

  const isReady = !!paymentAddress && !!paymentPublicKey && !!ordinalsAddress && !!ordinalsPublicKey && !!stacksAddress;

  const onWalletDisconnect = () => {
    setPaymentAddress(undefined);
    setPaymentPublicKey(undefined);
    setOrdinalsAddress(undefined);
    setOrdinalsPublicKey(undefined);
    setStacksAddress(undefined);
  };

  const toggleNetwork = () => {
    setNetwork(network === BitcoinNetworkType.Testnet ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet);
    onWalletDisconnect();
  };

  const onConnectClick = async () => {
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
        message: "SATS Connect Demo",
        network: { type: network },
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Payment);
        setPaymentAddress(paymentAddressItem?.address);
        setPaymentPublicKey(paymentAddressItem?.publicKey);

        const ordinalsAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Ordinals);
        setOrdinalsAddress(ordinalsAddressItem?.address);
        setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);

        const stacksAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Stacks);
        setStacksAddress(stacksAddressItem?.address);
        setStacksPublicKey(stacksAddressItem?.publicKey);
      },
      onCancel: () => alert("Request canceled"),
    });
  };

  const onConnectAccountClick = async () => {
    const response = await request('getAccounts', {
      purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
      message: 'SATS Connect Demo',
    });
    if (response.status === 'success') {
      const paymentAddressItem = response.result.find((address) => address.purpose === AddressPurpose.Payment);
      setPaymentAddress(paymentAddressItem?.address);
      setPaymentPublicKey(paymentAddressItem?.publicKey);

      const ordinalsAddressItem = response.result.find((address) => address.purpose === AddressPurpose.Ordinals);
      setOrdinalsAddress(ordinalsAddressItem?.address);
      setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);

      const stacksAddressItem = response.result.find((address) => address.purpose === AddressPurpose.Stacks);
      setStacksAddress(stacksAddressItem?.address);
      setStacksPublicKey(stacksAddressItem?.publicKey);
    } else {
      if (response.error) {
        alert("Error getting accounts. Check console for error logs");
        console.error(response.error);
      }
    }
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

  if (capabilityMessage) {
    return (
      <div style={{ padding: 30 }}>
        <h1>Sats Connect Test App - {network}</h1>
        <div>{capabilityMessage}</div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div style={{ padding: 30 }}>
        <h1>Sats Connect Test App - {network}</h1>
        <div>Please connect your wallet to continue</div>
        <h2>Available Wallets</h2>
        <div>
          {providers
            ? providers.map((provider) => (
                <button key={provider.id} className="provider" onClick={() => window.open(provider.chromeWebStoreUrl)}>
                  <img className="providerImg" src={provider.icon} />
                  <p className="providerName">{provider.name}</p>
                </button>
              ))
            : null}
        </div>
        <div style={{ background: "lightgray", padding: 30, marginTop: 10 }}>
          <button style={{ height: 30, width: 180 }} onClick={toggleNetwork}>
            Switch Network
          </button>
          <br />
          <br />
          <button style={{ height: 30, width: 180 }} onClick={onConnectClick}>
            Connect
          </button>
          <button style={{ height: 30, width: 180, marginLeft: 10 }} onClick={onConnectAccountClick}>
            Connect Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Sats Connect Test App - {network}</h1>
      <div>
        <div>Payment Address: {paymentAddress}</div>
        <div>Payment PubKey: {paymentPublicKey}</div>
        <div>Ordinals Address: {ordinalsAddress}</div>
        <div>Ordinals PubKey: {ordinalsPublicKey}</div>
        <br />
        <div className="container">
          <h3>Disconnect wallet</h3>
          <button onClick={onWalletDisconnect}>Disconnect</button>
        </div>
      </div>
    </div>
  );
};

export default App;
