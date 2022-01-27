import 'ethers';
import { ethers } from 'ethers';
import config from '../config/_config';
import store from 'redux/store/store';
import { APPLICATION_ACTIONS } from '../redux/actions';

// Re exported for easy importing
export const CONTRACT_NAMES = config.CONTRACT_NAMES;

/**
 * Callback to run after establishing web3connection state pass or fail
 * @callback web3ConnectCallback
 * @param { Object } err - Will be null if no error, or else contain the error
 */
class EthAdapter {

    constructor() {
        this.accounts = []; // Web3 Accounts List 
        this.provider = null; // Web3 Provider -- Populated on successful _connectToWeb3Wallet()
        this.signer = null; // Web3 Signer -- Populated on successful _connectToWeb3Wallet()
        this.contracts = config.CONTRACTS; // Contracts from config
        console.debug("EthAdapter Init: ", this);
    }


    /**
     * Attempt to connect to a Web3 Wallet from window.ethereum
     * @param { web3ConnectCallback } cb - Callback to run after a connection contains err if error
     */
    async connectToWeb3Wallet(cb) {
        store.dispatch(APPLICATION_ACTIONS.setWeb3Connecting(true));
        try {
            this.provider = new ethers.providers.Web3Provider(window.ethereum, "any"); // Establish connection to injected wallet
            this.accounts = await this.provider.send("eth_requestAccounts", []); // Request accounts
            this.signer = this.provider.getSigner(); // Get the signer
            let address = await this._getAddressByIndex(0)

            store.dispatch(APPLICATION_ACTIONS.setConnectedAddress(address))
            store.dispatch(APPLICATION_ACTIONS.setWeb3Connected(true))

            cb();
        } catch (ex) {
            console.error(ex);
            cb({ error: ex.message });
        }
        store.dispatch(APPLICATION_ACTIONS.setWeb3Connecting(false));
    }

    /**
     * Get address from accounts[index] or return 0 if empty.
     * @param {*} index - Index to get from this.accounts
     */
    async _getAddressByIndex(index) {
        return this.accounts.length > 0 ? this.accounts[index] : 0;
    }

    /**
     * Returns an ethers.js contract instance that has been instanced without a signer for read-only calls
     * @param {ContractName} contractName - One of the available contract name strings from config  
     */
    _getReadonlyContractInstance(contractName) {
        this._requireContractExists(contractName);
        this._requireContractAddress(contractName);
        this._requireContractAbi(contractName);
        return new ethers.Contract(this.contracts[contractName].address, this.contracts[contractName].abi, this.provider);
    }

    /**
     * Returns an ethers.js contract instance that has been instanced with a signer ( this.signer )
     * @param {ContractName} contractName - One of the available contract name strings from config  
     */
    _getSignerContractInstance(contractName) {
        this._requireContractExists(contractName);
        this._requireContractAddress(contractName);
        this._requireContractAbi(contractName);
        this._requireSigner(contractName);
        return new ethers.Contract(this.contracts[contractName].address, this.contracts[contractName].abi, this.signer);
    }

    // TBD: FINISH DETERMINISTIC CONFIG SETUP
    /** Get deterministic create2 contract address by contract name
     * @param {ContractName} contractName - One of the available contract name strings from config  
     * @returns {web3.eth.Contract} 
     */
    _getDeterministicContractAddress(contractName) {
        return `0x${this.web3.utils.sha3(`0x${[
            'ff',
            config.factoryContractAddress,
            config.CONTRACT_SALTS[contractName],
            this.web3.utils.sha3(config.CONTRACT_BYTECODE[contractName])
        ].map(x => x.replace(/0x/, '')).join('')}`).slice(-40)}`.toLowerCase();
    }

    /**
     * @param { Boolean } formatted - Instead of WEI BigNumber, return parsed  etehreum balance as a string 
     * @param { Number } accountIndex - Account index of this.accounts[i] to check balance for
     * @returns { BigNumber||String } - Ethereum balance of this.accounts[accountIndex] as BigNumber wei or if formatted===true, a utils.formatted string
     */
    async getEthereumBalance(formatted, accountIndex = 0) {
        return this._try(async () => {
            let balance = await this.provider.getBalance(this._getAddressByIndex(accountIndex))
            return formatted ? ethers.utils.formatEther(balance) : balance;
        })
    }

    async _throw(msg) {
        throw new Error("eth/ethAdaper.js: " + msg);
    }

    /** Internal contract settings requirement helper for contract functions */
    _requireContractExists(contractName) {
        if (!this.contracts[contractName]) {
            this._throw("Contract configuration for contract '" + contractName + "' nonexistant. Verify contract has been set in .env");
        }
    }

    /** Internal ABI requirement helper for contract functions */
    _requireContractAbi(contractName) {
        if (!this.contracts[contractName].abi) {
            this._throw("Requesting contract instance for contract '" + contractName + "' with nonexistant abi. Verify ABI has been set.");
        }
    }

    /** Internal contract address requirement helper for contract functions */
    _requireContractAddress(contractName) {
        if (!this.contracts[contractName].address) {
            this._throw("Requesting contract instance for contract '" + contractName + "' with nonexistant address. Verify address has been set.");
        }
    }

    /** Internal signer requirement helper for contract functions */
    _requireSigner(contractName) {
        if (!this.signer) {
            this._throw("Requesting contract instance for contract '" + contractName + "' but EthAdapter has not been provided a signer. Verify a signer has been set.");
        }
    }

    /** Sign a simple string with this.signer
     * @param {String} message - The string to sign
     * @returns { String } -- Signed message
     */
    async signSimpleStringMessage(message) {
        this._requireSigner();
        return await this.signer.signMessage(message);
    }

    /** Signs the bytes of message with this.signer -- Useful for signing hashes 
     * @param {String} message - The string to sign
     * @returns { String } -- Signed message
     */
    async signBytes(message) {
        this._requireSigner();
        const msgBytes = ethers.utils.arrayify(message);
        return await this.signer.signMessage(msgBytes)
    }

    /**
     * Try a function, if it fails return the error with message nested as "error" in a plain object
     * @param {*} func 
     * @returns { * } - Function result or error
     */
    async _try(func) {
        try {
            return await func();
        } catch (ex) {
            console.error(ex);
            return { error: ex.message };
        }
    }

    /**
     * Attempt a call on a contract method
     * @param {ContractName} contractName - One of the available contract name strings from config  
     * @param { String } methodName - Exact smart contract method name as a string
     * @param {Array} paramaters - Contract method parameters as an array  
     */
    async _tryCall(contractName, methodName, params = []) {
        let contract = this._getReadonlyContractInstance(contractName);
        let result = await contract[methodName]([...params]);
        // If return is a BN parse and return the value string, else just return
        if (ethers.BigNumber.isBigNumber(result)) {
            return result.toString();
        }
        return result;
    }

    /**
     * Attempt a send on a contract method
     * @param {ContractName} contractName - One of the available contract name strings from config  
     * @param { String } methodName - Exact smart contract method name as a string
     * @param {Array} paramaters - Contract method parameters as an array  
     */
    async _trySend(contractName, methodName, params = []) {
        return await this._getSignerContractInstance(contractName)[methodName]([...params]);
    }

}

let ethAdapter = new EthAdapter();
export default ethAdapter;