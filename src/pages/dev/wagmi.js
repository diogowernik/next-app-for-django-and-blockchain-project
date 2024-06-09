// @/pages/dev/wagmi.js
import dynamic from 'next/dynamic';
import MainLayout from "@/layouts/dex/dashboard/MainLayout";
import { wagmiConfig } from "@/config/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
const WagmiComponentNoSSR = dynamic(() => import('@/components/wagmi/WagmiComponent'), { ssr: false });

const WagmiPage = () => {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <MainLayout>
                    <WagmiComponentNoSSR />
                    
                </MainLayout>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default WagmiPage;
