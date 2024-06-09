import { WagmiComponent } from "@/components/wagmi/WagmiComponent";
import MainLayout from "@/layouts/dex/dashboard/MainLayout";
import { wagmiConfig } from "@/config/wagmiConfig";
import { WagmiProvider } from "wagmi";


const WagmiPage = () => {
    // Your code here

    return (
        <WagmiProvider config={wagmiConfig}>
            <MainLayout>
                <WagmiComponent />
            </MainLayout>
        </WagmiProvider>
    );
};

export default WagmiPage;
