// @/services/contract/getContract.js

import Web3 from 'web3'; // Esta importação não é necessária aqui, removê-la
import networkConfig from './config/networkConfig';
import TransferGatewayABI from './abis/TransferGateway.json';
import WtreeTokenABI from './abis/WtreeToken.json';

const abis = {
  TransferGateway: TransferGatewayABI,
  WtreeToken: WtreeTokenABI
};

/**
 * Obtem uma instância de um contrato com base no nome e na rede.
 *
 * @param {string} contractName - Nome do contrato conforme chave em abis e networkConfig
 * @param {string} network - Nome da rede conforme chave em networkConfig
 * @param {Web3} web3 - Instância de Web3 inicializada
 * @returns {Object} Instância do contrato Web3
 */
function getContract(contractName, network, web3) {
  // Obtem o endereço do contrato da configuração de rede baseada no nome do contrato e na rede
  const contractAddress = networkConfig[network][contractName];
  if (!contractAddress) {
    throw new Error(`Endereço do contrato não encontrado para ${contractName} na rede ${network}`);
  }

  // Obtem a ABI do contrato com base no nome do contrato
  const abi = abis[contractName];
  if (!abi) {
    throw new Error(`ABI não encontrada para o contrato ${contractName}`);
  }

  // Cria e retorna a instância do contrato
  return new web3.eth.Contract(abi, contractAddress);
}

export default getContract;
