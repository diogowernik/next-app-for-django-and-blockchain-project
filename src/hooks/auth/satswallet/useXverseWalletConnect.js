
import { AddressPurpose, getAddress } from "sats-connect";

// Hook para conectar a carteira
export const useXverseWalletConnect = (network, setAddressFunctions) => {
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
  

    return {
      onConnectClick,
    };
  };
  