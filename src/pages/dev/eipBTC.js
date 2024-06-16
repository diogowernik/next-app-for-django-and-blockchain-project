import dynamic from "next/dynamic";

const WalletsBTCPage = () => {

    const WalletsBTCGrid = dynamic(() => import('@/arquivo/wallets-btc/WalletsBTCGrid'), { ssr: false });

    return (
        <div>
            <WalletsBTCGrid />
        </div>
    );
};

export default WalletsBTCPage;