export const walletsConfig = {
    metamask: {
        name: 'MetaMask',
        connect: async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        },
        requestSignature: async (message, userAddress) => {
            return await window.ethereum.request({
                method: 'personal_sign',
                params: [message, userAddress],
            });
        },
    },
    trustwallet: {
        name: 'Trust Wallet',
        connect: async () => {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        },
        requestSignature: async (message, userAddress) => {
            return await window.ethereum.request({
                method: 'personal_sign',
                params: [message, userAddress],
            });
        },
    },
    xverse: {
        name: 'Xverse',
        connect: async (network) => {
            const response = await getAddress({
                payload: {
                    purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
                    message: "Connect With Xverse",
                    network: { type: network },
                },
            });
            const paymentAddressItem = response.addresses.find(
                (address) => address.purpose === AddressPurpose.Payment
            );
            return {
                paymentAddress: paymentAddressItem.address,
                paymentPublicKey: paymentAddressItem.publicKey,
                ordinalsAddresses: response.addresses
                    .filter((address) => address.purpose === AddressPurpose.Ordinals)
                    .map((address) => address.address),
                ordinalsPublicKeys: response.addresses
                    .filter((address) => address.purpose === AddressPurpose.Ordinals)
                    .map((address) => address.publicKey),
            };
        },
        requestSignature: async (message, userAddress) => {
            // Implementação da assinatura específica para Xverse, se necessário
        },
    },
    // Adicione outras carteiras aqui...
};
