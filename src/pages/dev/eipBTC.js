import dynamic from "next/dynamic";

const WalletsBTCPage = () => {

    const WalletsBTCGrid = dynamic(() => import('@/components/wallets-btc/WalletsBTCGrid'), { ssr: false });

    return (
        <div>
            <WalletsBTCGrid />
        </div>
    );
};

export default WalletsBTCPage;