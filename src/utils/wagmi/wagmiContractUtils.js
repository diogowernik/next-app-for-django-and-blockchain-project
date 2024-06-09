// @/utils/wagmi/wagmiContractUtils.js

import { ethers } from "ethers";

// Initialize the contract
export const getContract = (address, abi, signerOrProvider) => {
  return new ethers.Contract(address, abi, signerOrProvider);
};
