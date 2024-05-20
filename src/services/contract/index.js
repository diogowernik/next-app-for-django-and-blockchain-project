// @/services/contract/index.js

import ContractManager from './ContractManager';
import getContract from './getContract';

// Você pode criar uma exportação que inicialize o ContractManager com uma instância de web3, se isso for comum

import { initializeWeb3 } from '../wallet/Web3Initializer';

const web3 = initializeWeb3();

const contractManager = new ContractManager(web3);

export { contractManager, getContract };
