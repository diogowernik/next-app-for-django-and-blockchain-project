// import {WalletsEvmGrid} from "@/EIP6963/WalletsEvmGrid";
import dynamic from "next/dynamic";

const WalletsEvmPage = () => {

    const WalletsEvmGrid = dynamic(() => import('@/components/wallets-evm/WalletsEvmGrid'), { ssr: false });

    return (
        <div>
            <WalletsEvmGrid />
        </div>
    );
};

export default WalletsEvmPage;