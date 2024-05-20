// @/services/contract/ContractManager.js

import getContract from './getContract';
import networkConfig from './config/networkConfig';

class ContractManager {
    constructor(web3) {
        this.web3 = web3;
        this.contracts = {};
    }

    loadContract(contractName, network) {
        const contractAddress = networkConfig[network][contractName];
        const contract = getContract(contractName, contractAddress, this.web3);
        this.contracts[contractName] = contract;
        return contract;
    }

    getContract(contractName) {
        return this.contracts[contractName];
    }
}

export default ContractManager;
