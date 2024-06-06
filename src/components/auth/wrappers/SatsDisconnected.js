import { useSatsWalletAddresses } from "@/hooks/auth/satswallet/useSatsWalletAddresses";

// Wrapper para SatsDisconnected
export const SatsDisconnected = ({ children }) => {
    const walletAddresses = useSatsWalletAddresses();
    const isReady = !!walletAddresses.paymentAddress && !!walletAddresses.paymentPublicKey && !!walletAddresses.ordinalsAddress && !!walletAddresses.ordinalsPublicKey && !!walletAddresses.stacksAddress;
  
    if (isReady) {
      return null;
    }
  
    return <>{children}</>;
  };
  