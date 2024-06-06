// @/hooks/auth/satswallet/useNetwork
import { useLocalStorage } from "./useLocalStorage";
import { BitcoinNetworkType } from "sats-connect";


// Hook para gerenciar o estado da rede
export const useSatsNetwork = () => {
    const [network, setNetwork] = useLocalStorage("network", BitcoinNetworkType.Testnet);
  
    const toggleNetwork = (resetAddresses) => {
      setNetwork((prevNetwork) => prevNetwork === BitcoinNetworkType.Testnet ? BitcoinNetworkType.Mainnet : BitcoinNetworkType.Testnet);
      resetAddresses();
    };
  
    return {
      network,
      toggleNetwork
    };
  };