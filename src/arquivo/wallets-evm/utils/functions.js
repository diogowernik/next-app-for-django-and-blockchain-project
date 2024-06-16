export const truncateAddress = (address, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const mapToObj = (map) => {
  return Object.fromEntries(map.entries());
};

export const objToMap = (obj) => {
  return new Map(Object.entries(obj));
};

export const chainIDtoName = async (chainID) => {
  const res = await (await fetch("https://chainid.network/chains_mini.json")).json();
  const chainData = res.find(
    (chain) => chain.chainId === parseInt(chainID, 16)
  );
  return chainData?.name || "Unknown";
};

export const isDataURI = (uri) => {
  return /data:(image\/[-+\w.]+)(;?\w+=[-\w]+)*(;base64)?,.*/gu.test(uri);
};
