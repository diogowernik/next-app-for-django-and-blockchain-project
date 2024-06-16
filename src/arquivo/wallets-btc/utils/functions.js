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

export const isDataURI = (str) => {
  if (typeof str !== "string") {
    return false;
  }
  const regex = /^\s*data:([a-z]+\/[a-z0-9-+.]+)(;[a-z-]+=[a-z0-9-]+)*;base64,[a-z0-9!$&',()*+;=\-._~:@\/?%\s]*\s*$/i;
  return regex.test(str);
};

export const convertToDataURI = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
};

