import * as contractsConfig from './contracts';
import * as networkConfig from './network';

const configuration = {
    CONTRACTS: contractsConfig.CONTRACTS,
    CONTRACT_ABIS: contractsConfig.CONTRACT_ABIS,
    CONTRACT_ADDRESSES: contractsConfig.CONTRACT_ADDRESSES,
    CONTRACT_NAMES: contractsConfig.CONTRACT_NAMES,
    ETHEREUM_NETWORK_BY_ID: networkConfig.ETHEREUM_NETWORK_BY_ID,
    ETHEREUM_NETWORK_NAMES: networkConfig.ETHEREUM_NETWORK_NAMES
}


export default configuration;