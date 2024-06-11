// @/config/wagmiConfig.js

// Raimbow Kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";

// Wagmi
import { http } from "wagmi";
import { mainnet, sepolia,} from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "";

const wallets = [
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet,
      trustWallet,
    ],
    },
];

export const wtreeWagmiConfig = getDefaultConfig({
    appName: "Next dApp Template",
    projectId: projectId,
    wallets: wallets,
    chains: [
      mainnet,
      sepolia,
    ],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
