import { useMemo } from "react";
import { getProviders } from "sats-connect";
import { useSatsWalletAddresses } from "@/hooks/auth/satswallet/useSatsWalletAddresses";
import { useSatsNetwork } from "@/hooks/auth/satswallet/useSatsNetwork";
import { useCapabilityCheck } from "@/hooks/auth/satswallet/useCapabilityCheck";
import { useConnectWallet } from "@/hooks/auth/satswallet/useConnectWallet";

import MainLayout from "@/layouts/dex/dashboard/MainLayout";
import SendBitcoin from "@/components/sats/SendBitcoin";

const SatsDashboard = () => {
  const walletAddresses = useSatsWalletAddresses();
  const { network, toggleNetwork } = useSatsNetwork();
  const { capabilityState, capabilities } = useCapabilityCheck(network);
  const { onConnectClick, onConnectAccountClick } = useConnectWallet(network, walletAddresses);
  const providers = useMemo(() => (typeof window !== "undefined" ? getProviders() : []), []);

  const isReady = !!walletAddresses.paymentAddress && !!walletAddresses.paymentPublicKey && !!walletAddresses.ordinalsAddress && !!walletAddresses.ordinalsPublicKey && !!walletAddresses.stacksAddress;

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
    <MainLayout>
      <div style={{ padding: 30 }}>
        <h1>Sats Connect Test App - {network}</h1>
        <div>Please connect your wallet to continue</div>
        <h2>Available Wallets</h2>
        <div>
          {providers
            ? providers.map((provider) => (
                <button key={provider.id} className="provider" onClick={() => window.open(provider.chromeWebStoreUrl)}>
                  <img src={provider.icon} alt="provider icon" style={{ width: 90}} />
                  <p className="providerName">{provider.name}</p>
                </button>
              ))
            : null}
        </div>
        <div style={{ background: "lightgray", padding: 30, marginTop: 10 }}>
          <button style={{ height: 30, width: 180 }} onClick={() => toggleNetwork(walletAddresses.resetAddresses)}>
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
      </MainLayout>
    );
  }

  return (
  <MainLayout>
    <div style={{ padding: 30 }}>
      <h1>Sats Connect Test App - {network}</h1>
      <div>
        <div>Payment Address: {walletAddresses.paymentAddress}</div>
        <div>Payment PubKey: {walletAddresses.paymentPublicKey}</div>
        <div>Ordinals Address: {walletAddresses.ordinalsAddress}</div>
        <div>Ordinals PubKey: {walletAddresses.ordinalsPublicKey}</div>
        <br />
        <div className="container">
          <h3>Disconnect wallet</h3>
          <button onClick={walletAddresses.resetAddresses}>Disconnect</button>
        </div>
        <div style={{ background: "lightgray", padding: 30, marginTop: 10 }}>

          <SendBitcoin
            address={walletAddresses.paymentAddress}
            network={network}
            capabilities={capabilities}
          />
        </div>
      </div>
    </div>
  </MainLayout>
  );
};

export default SatsDashboard;
