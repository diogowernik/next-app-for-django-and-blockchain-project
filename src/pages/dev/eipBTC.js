import dynamic from "next/dynamic";

const WalletsBTCPage = () => {

    const WalletsBTCGrid = dynamic(() => import('@/WalletsBTC/WalletsBTCGrid'), { ssr: false });

    return (
        <div>
            <WalletsBTCGrid />
        </div>
    );
};

export default WalletsBTCPage;