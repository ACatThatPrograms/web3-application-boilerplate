/** @namespace EthAdapter */

import 'ethers';
import { ethers } from 'ethers';
import config from '../config/_config';
import store from 'redux/store/store';
import { ETHEREUM_ACTION_TYPES } from 'redux/constants';
import { ETHEREUM_NETWORK_BY_ID } from 'config/network';
import contractFxs from './contractMethods';

// Re exported for easy importing elsewhere
export const CONTRACT_NAMES = config.CONTRACT_NAMES;

// Export direct access to contract methods
export const CONTRACT_FXS = contractFxs;

var instanced = false; // Is ethAdapter instanced?

/**
 * Callback to run after establishing web3connection state pass or fail
 * @callback web3ConnectCallback
 * @param { Object } err - Will be null if no error, or else contain the error
 */

/**
 * @class Ethereum Adapter
 * @classdesc Used to interact with the browser's web3 wallet
 * for signing transactions and making actions against the connected blockchain. Should be treated as singleton.
 */
class EthAdapter {

    constructor() {
        // Prevent multiple-instances
        if (instanced) {
            throw new Error("Do not instance EthAdapter more than once. Use the already existing instance that is exported from eth/ethAdapter.js")
        }
        instanced = true;

        // Redux Hook-ins For class instance state -- Useful for state that may be shown to UI to propagate renders
        this.accounts = this._buildGetterSetterForEthereumStateKey(["accounts"]);
        this.connected = this._buildGetterSetterForEthereumStateKey(["connected"]);
        this.connecting = this._buildGetterSetterForEthereumStateKey(["connecting"]);
        this.connectedAccount = this._buildGetterSetterForEthereumStateKey(["connectedAccount"]);
        this.balances = this._buildGetterSetterForEthereumStateKey(["balances"]);
        this.balancesLoading = this._buildGetterSetterForEthereumStateKey(["balancesLoading"]);
        this.networkId = this._buildGetterSetterForEthereumStateKey(["networkId"]);
        this.networkName = this._buildGetterSetterForEthereumStateKey(["networkName"]);

        // Instance state not needed in redux
        this.contracts = config.CONTRACTS; // Contract details from contract configuration
        this.provider = null; // Web3 Provider -- Populated on successful _connectToWeb3Wallet()
        this.signer = null; // Web3 Signer -- Populated on successful _connectToWeb3Wallet()

        // Initialization debug printout
        console.debug("EthAdapter instanced: ", { instace: this, state: store.getState().ethereum });
    }


    /**
     * Returns a getter/setter for a specific redux state value keychain
     * Allows easier integration with redux state for Class updates to propagate UI renders
     * @param { Array.String } keychain - The keychain to create getter/setters for :: eg {balances: ethereum: 2 } === ["balances", "ethereum"]
     */
    _buildGetterSetterForEthereumStateKey(keychain = []) {
        /**
         * Returns the current state from redux
         * @returns { (String|Object) } - The returned state
         */
        const get = function () {
            let state = store.getState().ethereum;
            let maxDepth = keychain.length // Final depth to search an object for key 
            let stateFound = state[keychain[0]]; // Get root state
            for (let i = 1; i < maxDepth; i++) { // Search object until state key is found
                stateFound = stateFound[keychain[i]];
            }
            return stateFound
        }
        /**
        * Updates the redux state for this object
        */
        const set = (updateValue) => {
            store.dispatch({
                type: ETHEREUM_ACTION_TYPES.UPDATE_ETHEREUM_INSTANCE_STATE_BY_KEYCHAIN,
                payload: { keychain: keychain, value: updateValue }
            });
        }
        return { get: get, set: set }
    }

    /**
     * Attempt to connect to a Web3 Wallet from window.ethereum
     * @param { connectToWeb3Wallet~web3ConnectCallBack } web3ConnectCallback - Callback to run after a connection contains err if error
     */
    async connectToWeb3Wallet(web3ConnectCallback) {
        this.connecting.set(true);
        if (!window.ethereum) {
            return { error: "No web3 wallet detected." }
        }
        try {
            this.provider = new ethers.providers.Web3Provider(window.ethereum, "any"); // Establish connection to injected wallet
            this.accounts.set(await this.provider.send("eth_requestAccounts", [])); // Request accounts
            this.signer = this.provider.getSigner(); // Get the signer
            this.networkId.set(window.ethereum.chainId);
            let address = await this.getAddressByIndex(0)
            this.connectedAccount.set(address);
            this.connected.set(true);
            this.updateEthereumBalance(0);
            this._setupWeb3Listeners(); // Setup listeners for injected web3 wallet
            web3ConnectCallback();
        } catch (ex) {
            console.error(ex);
            web3ConnectCallback({ error: ex.message });
        }
        this.connecting.set(false);
        console.debug("EthAdapter Connected: ", { reduxState: store.getState().ethereum, instance: this });
    }

    /**
     * Setup web3 listeners for connected web3Wallet state changes
     */
    async _setupWeb3Listeners() {
        if (window.ethereum) {
            window.ethereum.on("networkChanged", networkId => {
                this.networkId.set(networkId);
                this.networkName.set(ETHEREUM_NETWORK_BY_ID[networkId]);
                this.updateEthereumBalance();
            })
            window.ethereum.on("accountsChanged", async accounts => {
                this.accounts.set(accounts);
                let address = await this.getAddressByIndex(0)
                this.connectedAccount.set(address);
                this.updateEthereumBalance();
            })
        } else {
            console.warn("No web3 detected.") // TODO: Add fallback
        }
    }

    /**
     * This callback is called after a connectToWeb3Wallet attempt with err if err.
     * @callback connectToWeb3Wallet~web3ConnectCallBack
     * @param { (Object|Null) } err - Error if an object has occured
     */

    /**
     * Get address from accounts[index] or return 0 if empty.
     * @param { Number } index - Index to get from this.accounts
     */
    async getAddressByIndex(index = 0) {
        let accounts = this.accounts.get();
        return accounts.length > 0 ? accounts[index] : 0;
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
     * @param { Number } accountIndex - Account index of this.accounts[i] to check balance for
     */
    async updateEthereumBalance(accountIndex = 0) {
        if (isNaN(accountIndex)) { throw new Error("updateEthereumBalance() can only be called with a number") }
        return this._try(async () => {
            console.log(await this.getAddressByIndex(accountIndex))
            let balance = await this.provider.getBalance(this.getAddressByIndex(accountIndex))
            this.balances.set({
                ...this.balances.get(),
                ethereum: parseFloat(ethers.utils.formatEther(balance)).toFixed(4)
            })
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