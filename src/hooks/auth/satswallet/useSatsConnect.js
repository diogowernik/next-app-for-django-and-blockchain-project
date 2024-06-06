// @/hooks/auth/satswallet/useSatsConnect.js

// Adaptado para o projeto wtree

import { useCallback } from 'react';
import { AddressPurpose, getAddress } from "sats-connect";

export const useSatsConnect = (setAddressFunctions, setIsSatsAuthenticated, enqueueSnackbar) => {
    const { setPaymentAddress, setPaymentPublicKey, setOrdinalsAddress, setOrdinalsPublicKey, setStacksAddress } = setAddressFunctions;

    const satsConnect = useCallback((network) => async () => {
        console.log("Chamando satsConnect...");

        try {
            await getAddress({
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
        } catch (error) {
            console.error("Falha ao conectar com Sats Connect:", error);
            enqueueSnackbar(error.message || 'Failed to connect with Sats Connect.', { variant: 'error' });
        }
    }, [setAddressFunctions, setIsSatsAuthenticated, enqueueSnackbar]);

    return satsConnect;
};
