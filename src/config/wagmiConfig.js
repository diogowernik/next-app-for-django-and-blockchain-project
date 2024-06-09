// @/config/wagmiConfig.js

// Raimbow Kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

// Wagmi
import { http } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || "";

// const { wallets } = getDefaultWallets(); (Este comentário pode ser mantido se relevante para contexto)
const wallets = [
  // ...getDefaultWallets().wallets, (Este comentário pode ser mantido se relevante para contexto)
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet,
      walletConnectWallet,
      trustWallet,
      uniswapWallet,
    ],
    },
];


export const wagmiConfig = getDefaultConfig({
    appName: "Next dApp Template",
    projectId: projectId,
    wallets: wallets,
    chains: [
      mainnet,
      polygon,
      optimism,
      arbitrum,
      base,
      zora,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
    ],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
      [zora.id]: http(),
    },
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
