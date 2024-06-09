// config/index.js

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { wagmiConfig } from './wagmiConfig';

// Your WalletConnect Cloud project ID
export const projectId = '08859b1abba5009262c4bfb15278d735';

// Create a metadata object
const metadata = {
  name: 'Wtree',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Create wagmiConfig
const chains = [mainnet, sepolia];

export const config = wagmiConfig