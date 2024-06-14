
import defaultProviderIcon from "@/EIP6963/icons/default.svg";
// TODO: Add icons for Xverse and Unisat

const providerIcons = {
  Xverse: defaultProviderIcon,
  Unisat: defaultProviderIcon,
  Default: defaultProviderIcon,
};

const getProviderNameAndIcon = (provider) => {
  if (provider.isXverse) return { name: "Xverse", icon: providerIcons.Xverse };
  if (provider.isUnisat) return { name: "Unisat", icon: providerIcons.Unisat };

  return { name: "Unknown", icon: providerIcons.Default };
};

export const getInjectedInfo = (uuid, bitcoinNetwork) => {
  const providerInfo = bitcoinNetwork ? getProviderNameAndIcon(bitcoinNetwork) : { name: "Unknown", icon: providerIcons.Default };
  return { uuid, ...providerInfo };
};
