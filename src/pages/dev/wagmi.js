// @/pages/dev/wagmi.js
import dynamic from 'next/dynamic';
import MainLayout from "@/layouts/dex/dashboard/MainLayout";
import { wagmiConfig } from "@/config/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MetamaskOnlyApp from './metamask';
import TrustWalletOnlyApp from './trustwallet';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';


const queryClient = new QueryClient();
const WagmiComponentNoSSR = dynamic(() => import('@/components/wagmi/WagmiComponent'), { ssr: false });
// const MetamaskOnlyAppNoSSR = dynamic(() => import('./metamask'), { ssr: false });

const WagmiPage = () => {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {/* <RainbowKitProvider> */}
                    <MainLayout>
                        <WagmiComponentNoSSR />
                        {/* <MetamaskOnlyAppNoSSR /> */}
                        {/* <MetamaskOnlyApp /> */}
                        {/* <TrustWalletOnlyApp /> */}
                        
                    </MainLayout>
                {/* </RainbowKitProvider> */}
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default WagmiPage;
