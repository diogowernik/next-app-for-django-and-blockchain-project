// @/config/wagmiConfig.js

// Raimbow Kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  bitgetWallet,
  bifrostWallet,
  bitskiWallet,
  braveWallet,
  coinbaseWallet,
  coin98Wallet,
  coreWallet,
  dawnWallet,
  enkryptWallet,
  foxWallet,
  frameWallet,
  frontierWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  okxWallet,
  omniWallet,
  oneKeyWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  safeheronWallet,
  tahoWallet,
  talismanWallet,
  tokenaryWallet,
  tokenPocketWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
  xdefiWallet,
  zerionWallet,
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
      rainbowWallet,
      rabbyWallet,
      ledgerWallet,
      walletConnectWallet,
      phantomWallet,
      coinbaseWallet,
      coin98Wallet,
      trustWallet,
      uniswapWallet,
    ],
  },
  {
    groupName: "Other Wallets",
    wallets: [
      argentWallet,
      bitgetWallet,
      bifrostWallet,
      bitskiWallet,
      braveWallet,
      coreWallet,
      dawnWallet,
      enkryptWallet,
      foxWallet,
      frameWallet,
      frontierWallet,
      imTokenWallet,
      injectedWallet,
      mewWallet,
      okxWallet,
      omniWallet,
      oneKeyWallet,
      safeWallet,
      safeheronWallet,
      tahoWallet,
      talismanWallet,
      tokenaryWallet,
      tokenPocketWallet,
      xdefiWallet,
      zerionWallet,
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

export const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // Mainnet

export const chainIdToName = {
    1: "Mainnet",
    137: "Polygon",
    42161: "Arbitrum",
    100: "xDai",
    250: "Fantom",
    43114: "Avalanche",
    43113: "Fuji CChain",
    43120: "Fuji EVM",
    43114: "Avalanche",
    43113: "Fuji CChain",
    43120: "Fuji EVM",
};

