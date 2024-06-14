import defaultProviderIcon from "@/components/wallets-btc/icons/default.svg";
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

export const getInjectedInfo = (uuid, provider) => {
  const providerInfo = getProviderNameAndIcon(provider);
  return { uuid, ...providerInfo };
};
