

import defaultProviderIcon from "@/WalletsEVM/icons/default.svg";
import rainbowProviderIcon from "@/WalletsEVM/icons/rainbow.svg";
import xdefiProviderIcon from "@/WalletsEVM/icons/xdefi.svg";

const providerIcons = {
  ApexWallet: defaultProviderIcon,
  CoreWallet: defaultProviderIcon,
  Backpack: defaultProviderIcon,
  BifrostWallet: defaultProviderIcon,
  BitKeep: defaultProviderIcon,
  Bitski: defaultProviderIcon,
  BlockWallet: defaultProviderIcon,
  BraveWallet: defaultProviderIcon,
  CoinbaseWallet: defaultProviderIcon,
  DawnWallet: defaultProviderIcon,
  Defiant: defaultProviderIcon,
  Enkrypt: defaultProviderIcon,
  Exodus: defaultProviderIcon,
  Frame: defaultProviderIcon,
  FrontierWallet: defaultProviderIcon,
  GameStopWallet: defaultProviderIcon,
  HyperPayWallet: defaultProviderIcon,
  ImToken: defaultProviderIcon,
  HaloWallet: defaultProviderIcon,
  KuCoinWallet: defaultProviderIcon,
  MathWallet: defaultProviderIcon,
  OKXWallet: defaultProviderIcon,
  OneInchWallet: defaultProviderIcon,
  Opera: defaultProviderIcon,
  Phantom: defaultProviderIcon,
  RipioPortal: defaultProviderIcon,
  RabbyWallet: defaultProviderIcon,
  Rainbow: rainbowProviderIcon,
  Status: defaultProviderIcon,
  Talisman: defaultProviderIcon,
  Taho: defaultProviderIcon,
  TokenPocket: defaultProviderIcon,
  Tokenary: defaultProviderIcon,
  TrustWallet: defaultProviderIcon,
  XDEFI: xdefiProviderIcon,
  Zerion: defaultProviderIcon,
  MetaMask: defaultProviderIcon,
};

const getProviderNameAndIcon = (provider) => {
  if (provider.isApexWallet) return { name: "Apex Wallet", icon: providerIcons.ApexWallet };
  if (provider.isAvalanche) return { name: "Core Wallet", icon: providerIcons.CoreWallet };
  if (provider.isBackpack) return { name: "Backpack", icon: providerIcons.Backpack };
  if (provider.isBifrost) return { name: "Bifrost Wallet", icon: providerIcons.BifrostWallet };
  if (provider.isBitKeep) return { name: "BitKeep", icon: providerIcons.BitKeep };
  if (provider.isBitski) return { name: "Bitski", icon: providerIcons.Bitski };
  if (provider.isBlockWallet) return { name: "BlockWallet", icon: providerIcons.BlockWallet };
  if (provider.isBraveWallet) return { name: "Brave Wallet", icon: providerIcons.BraveWallet };
  if (provider.isCoinbaseWallet) return { name: "Coinbase Wallet", icon: providerIcons.CoinbaseWallet };
  if (provider.isDawn) return { name: "Dawn Wallet", icon: providerIcons.DawnWallet };
  if (provider.isDefiant) return { name: "Defiant", icon: providerIcons.Defiant };
  if (provider.isEnkrypt) return { name: "Enkrypt", icon: providerIcons.Enkrypt };
  if (provider.isExodus) return { name: "Exodus", icon: providerIcons.Exodus };
  if (provider.isFrame) return { name: "Frame", icon: providerIcons.Frame };
  if (provider.isFrontier) return { name: "Frontier Wallet", icon: providerIcons.FrontierWallet };
  if (provider.isGamestop) return { name: "GameStop Wallet", icon: providerIcons.GameStopWallet };
  if (provider.isHyperPay) return { name: "HyperPay Wallet", icon: providerIcons.HyperPayWallet };
  if (provider.isImToken) return { name: "ImToken", icon: providerIcons.ImToken };
  if (provider.isHaloWallet) return { name: "Halo Wallet", icon: providerIcons.HaloWallet };
  if (provider.isKuCoinWallet) return { name: "KuCoin Wallet", icon: providerIcons.KuCoinWallet };
  if (provider.isMathWallet) return { name: "MathWallet", icon: providerIcons.MathWallet };
  if (provider.isOkxWallet || provider.isOKExWallet) return { name: "OKX Wallet", icon: providerIcons.OKXWallet };
  if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet) return { name: "1inch Wallet", icon: providerIcons.OneInchWallet };
  if (provider.isOpera) return { name: "Opera", icon: providerIcons.Opera };
  if (provider.isPhantom) return { name: "Phantom", icon: providerIcons.Phantom };
  if (provider.isPortal) return { name: "Ripio Portal", icon: providerIcons.RipioPortal };
  if (provider.isRabby) return { name: "Rabby Wallet", icon: providerIcons.RabbyWallet };
  if (provider.isRainbow) return { name: "Rainbow", icon: providerIcons.Rainbow };
  if (provider.isStatus) return { name: "Status", icon: providerIcons.Status };
  if (provider.isTalisman) return { name: "Talisman", icon: providerIcons.Talisman };
  if (provider.isTally) return { name: "Taho", icon: providerIcons.Taho };
  if (provider.isTokenPocket) return { name: "TokenPocket", icon: providerIcons.TokenPocket };
  if (provider.isTokenary) return { name: "Tokenary", icon: providerIcons.Tokenary };
  if (provider.isTrust || provider.isTrustWallet) return { name: "Trust Wallet", icon: providerIcons.TrustWallet };
  if (provider.isXDEFI) return { name: "XDEFI", icon: providerIcons.XDEFI };
  if (provider.isZerion) return { name: "Zerion", icon: providerIcons.Zerion };
  if (provider.isMetaMask) return { name: "MetaMask", icon: providerIcons.MetaMask };

  return { name: "Injected", icon: providerIcons.default };
};

export const getInjectedInfo = (uuid, ethereum) => {
  const providerInfo = ethereum ? getProviderNameAndIcon(ethereum) : { name: "Injected", icon: providerIcons.default };
  return { uuid, ...providerInfo };
};


