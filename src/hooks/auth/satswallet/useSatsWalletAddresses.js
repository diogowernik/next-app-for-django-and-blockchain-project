// @/hooks/auth/satswallet/useWalletAddresses
import { useLocalStorage } from "@/hooks/auth/satswallet/useLocalStorage";

// Hook para gerenciar endereços da carteira
export const useSatsWalletAddresses = () => {
    const [paymentAddress, setPaymentAddress] = useLocalStorage("paymentAddress");
    const [paymentPublicKey, setPaymentPublicKey] = useLocalStorage("paymentPublicKey");
    const [ordinalsAddress, setOrdinalsAddress] = useLocalStorage("ordinalsAddress");
    const [ordinalsPublicKey, setOrdinalsPublicKey] = useLocalStorage("ordinalsPublicKey");
    const [stacksAddress, setStacksAddress] = useLocalStorage("stacksAddress");
    const [stacksPublicKey] = useLocalStorage("stacksPublicKey");
  
    const resetAddresses = () => {
      setPaymentAddress(undefined);
      setPaymentPublicKey(undefined);
      setOrdinalsAddress(undefined);
      setOrdinalsPublicKey(undefined);
      setStacksAddress(undefined);
    };
  
    return {
      paymentAddress,
      paymentPublicKey,
      ordinalsAddress,
      ordinalsPublicKey,
      stacksAddress,
      stacksPublicKey,
      setPaymentAddress,
      setPaymentPublicKey,
      setOrdinalsAddress,
      setOrdinalsPublicKey,
      setStacksAddress,
      resetAddresses
    };
  };