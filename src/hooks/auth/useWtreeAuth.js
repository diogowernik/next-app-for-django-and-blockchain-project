import { useAuth } from '@/context/AuthContext';
import { walletConfig } from '@/config/WalletConfig';

export const useWallet = (walletName) => {
    const { authState, updateAuthState } = useAuth();

    const connect = async (network) => {
        const wallet = walletConfig[walletName];
        if (!wallet) throw new Error(`Wallet ${walletName} not supported`);
        
        const userState = await wallet.connect(network);
        updateAuthState(walletName, { isAuthenticated: true, ...userState });
    };

    const requestSignature = async (message) => {
        const wallet = walletConfig[walletName];
        if (!wallet) throw new Error(`Wallet ${walletName} not supported`);

        const userAddress = authState.walletSpecificState[walletName]?.userAddress;
        if (!userAddress) throw new Error(`User is not connected with ${walletName}`);

        return await wallet.requestSignature(message, userAddress);
    };

    return {
        connect,
        requestSignature,
        isAuthenticated: authState.walletSpecificState[walletName]?.isAuthenticated || false,
        userAddress: authState.walletSpecificState[walletName]?.userAddress || null,
    };
};
