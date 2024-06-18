import { Network } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { net } from "web3";

// Provedores de ícones
const providerIcons = {
  WtreeCrypto: "/icons/wtree-crypto.png",
  WtreeFiat: "/icons/wtree-fiat.png",
  Default: "/icons/default.svg",
};

// Provedores do sistema Wtree
const providers = [
  {
    provider: {
      info: {
        uuid: uuidv4(),
        name: "My Crypto",
        icon: providerIcons.WtreeCrypto,
        rdns: "System Wallet",
        network: 'Sepolia',
      },
      accounts: [],
      publicKeys: [],
      connected: true,
    },
  },
  {
    provider: {
      info: {
        uuid: uuidv4(),
        name: "My Fiat",
        icon: providerIcons.WtreeFiat,
        rdns: "System Wallet",
        network: 'testnet',
      },
      accounts: [],
      publicKeys: [],
      connected: true,
    },
  },
];

export default providers;
