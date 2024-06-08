import { useState, useEffect } from "react";

export const useUnisatWalletConnect = () => {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUnisatAvailability = async () => {
      let unisat = window.unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = window.unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else {
        setUnisatInstalled(false);
      }
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

  return { unisatInstalled, accounts, error, connectWallet };
};

