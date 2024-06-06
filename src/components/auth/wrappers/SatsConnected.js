import { useSatsWalletAddresses } from "@/hooks/auth/satswallet/useSatsWalletAddresses";
import { useCapabilityCheck } from "@/hooks/auth/satswallet/useCapabilityCheck";
import { useSatsNetwork } from "@/hooks/auth/satswallet/useSatsNetwork";
import MainLayout from "@/layouts/dex/dashboard/MainLayout";

// Wrapper para SatsConnected
export const SatsConnected = ({ children }) => {
  const walletAddresses = useSatsWalletAddresses();
  const { network } = useSatsNetwork();
  const { capabilityState, capabilities } = useCapabilityCheck(network);

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
        </div>
      </MainLayout>
    );
  }

  return <>{children({ capabilities, walletAddresses })}</>;
};

