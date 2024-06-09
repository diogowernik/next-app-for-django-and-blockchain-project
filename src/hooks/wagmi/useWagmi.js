// @/hooks/wagmi/useWagmi.js

import { useMemo } from "react";
import {
  BrowserProvider,
  JsonRpcSigner,
  FallbackProvider,
  JsonRpcProvider,
} from "ethers";
import { useConnectorClient, useClient } from "wagmi";

export const walletClientToSigner = (client) => {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
};

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export const useEthersSigner = ({ chainId } = {}) => {
  const { data: client } = useConnectorClient({ chainId });
  return useMemo(
    () => (client ? walletClientToSigner(client) : undefined),
    [client]
  );
};

export const publicClientToProvider = (client) => {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback") {
    const providers = (transport.transports).map(
      ({ value }) => new JsonRpcProvider(value?.url, network)
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
};

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export const useEthersProvider = ({ chainId } = {}) => {
  const client = useClient({ chainId });
  return useMemo(
    () => (!client ? undefined : publicClientToProvider(client)),
    [client]
  );
};
