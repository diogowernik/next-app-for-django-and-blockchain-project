
import { AddressPurpose, getAddress, request } from "sats-connect";

// Hook para conectar a carteira
export const useConnectWallet = (network, setAddressFunctions) => {
    const { setPaymentAddress, setPaymentPublicKey, setOrdinalsAddress, setOrdinalsPublicKey, setStacksAddress } = setAddressFunctions;
  
    const onConnectClick = async () => {
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
        },
        onCancel: () => alert("Request canceled"),
      });
    };
  
    const onConnectAccountClick = async () => {
      const response = await request('getAccounts', {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment, AddressPurpose.Stacks],
        message: 'SATS Connect Demo',
      });
      if (response.status === 'success') {
        const paymentAddressItem = response.result.find((address) => address.purpose === AddressPurpose.Payment);
        setPaymentAddress(paymentAddressItem?.address);
        setPaymentPublicKey(paymentAddressItem?.publicKey);
  
        const ordinalsAddressItem = response.result.find((address) => address.purpose === AddressPurpose.Ordinals);
        setOrdinalsAddress(ordinalsAddressItem?.address);
        setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);
  
        const stacksAddressItem = response.result.find((address) => address.purpose === AddressPurpose.Stacks);
        setStacksAddress(stacksAddressItem?.address);
      } else {
        if (response.error) {
          alert("Error getting accounts. Check console for error logs");
          console.error(response.error);
        }
      }
    };
  
    return {
      onConnectClick,
      onConnectAccountClick
    };
  };
  