import { BitcoinNetworkType } from "sats-connect";
import { v4 as uuidv4 } from "uuid";
import { getAddress, AddressPurpose } from "sats-connect";

// Provedores de ícones
const providerIcons = {
  Xverse: "/icons/xverse.png",
  Unisat: "/icons/unisat.png",
  Default: "/icons/default.svg",
};

// Função para conectar ao Unisat
const connectUnisat = async () => {
  const unisat = window.unisat;
  const accounts = await unisat.requestAccounts();
  const publicKeys = await Promise.all(accounts.map(() => unisat.getPublicKey()));
  return { accounts, publicKeys };
};

// Função para conectar ao Xverse
const connectXverse = async (providerInfo) => {
  return new Promise((resolve, reject) => {
    getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
        message: `Connect With ${providerInfo.name}`,
        network: { type: providerInfo.network },
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment
        );
        const ordinalsAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Ordinals
        );

        const accounts = [
          paymentAddressItem?.address,
          ordinalsAddressItem ? ordinalsAddressItem.address : null,
        ].filter(Boolean);

        const publicKeys = [
          paymentAddressItem?.publicKey,
          ordinalsAddressItem ? ordinalsAddressItem.publicKey : null,
        ].filter(Boolean);

        resolve({ accounts, publicKeys });
      },
      onCancel: () => reject(new Error("Connection Request Canceled")),
    });
  });
};

const providers = [
  {
    provider: {
      info: {
        uuid: uuidv4(),
        name: "Xverse",
        icon: providerIcons.Xverse,
        rdns: "xverse.app",
        network: BitcoinNetworkType.Testnet,
      },
      accounts: [],
      publicKeys: [],
      connected: false,
      connect: connectXverse,
    },
  },
  {
    provider: {
      info: {
        uuid: uuidv4(),
        name: "Unisat",
        icon: providerIcons.Unisat,
        rdns: "unisat.io",
        network: BitcoinNetworkType.Testnet,
      },
      accounts: [],
      publicKeys: [],
      connected: false,
      connect: connectUnisat,
    },
  },
];

export default providers;
