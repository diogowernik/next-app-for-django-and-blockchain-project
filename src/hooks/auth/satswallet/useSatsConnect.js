import { useCallback } from 'react';
import { AddressPurpose, getAddress, request } from "sats-connect";

export const useSatsConnect = (network, setAddressFunctions, setIsSatsAuthenticated, enqueueSnackbar) => {
    const { setPaymentAddress, setPaymentPublicKey, setOrdinalsAddress, setOrdinalsPublicKey, setStacksAddress } = setAddressFunctions;

    const satsConnect = useCallback(async () => {
        console.log("Chamando satsConnect...");

        try {
            const response = await getAddress({
                payload: {
                    purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
                    message: "SATS Connect Demo",
                    network: { type: network },
                },
                onFinish: (response) => {
                    const paymentAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Payment);
                    setPaymentAddress(paymentAddressItem?.address);
                    setPaymentPublicKey(paymentAddressItem?.publicKey);

                    const ordinalsAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Ordinals);
                    setOrdinalsAddress(ordinalsAddressItem?.address);
                    setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);

                    const stacksAddressItem = response.addresses.find((address) => address.purpose === AddressPurpose.Stacks);
                    setStacksAddress(stacksAddressItem?.address);
                    
                    setIsSatsAuthenticated(true);
                    enqueueSnackbar('Connected with Sats Connect successfully!', { variant: 'success' });
                    console.log("Usuário conectado com os endereços:", {
                        paymentAddress: paymentAddressItem?.address,
                        ordinalsAddress: ordinalsAddressItem?.address,
                        stacksAddress: stacksAddressItem?.address,
                    });
                },
                onCancel: () => {
                    console.warn("Request canceled");
                    enqueueSnackbar('Connection request canceled.', { variant: 'warning' });
                }
            });

            if (response.error) {
                console.error("Erro ao conectar com Sats Connect:", response.error);
                enqueueSnackbar(response.error.message || 'Failed to connect with Sats Connect.', { variant: 'error' });
            }
        } catch (error) {
            console.error("Falha ao conectar com Sats Connect:", error);
            enqueueSnackbar(error.message || 'Failed to connect with Sats Connect.', { variant: 'error' });
        }
    }, [network, setAddressFunctions, setIsSatsAuthenticated, enqueueSnackbar]);

    return satsConnect;
};
