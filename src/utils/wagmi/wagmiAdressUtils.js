// @/utils/wagmi/wagmiAdressUtils.js

export const getShortAddress = (address) => {
  if (!address || address.length <= 10) {
    return address;
  }

  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4);

  return `${start}…${end}`;
};

export const isEthAddress = (address) => {
  if (!address) return false;

  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};
