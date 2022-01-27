import { APPLICATION_ACTION_TYPES } from 'redux/constants';

/**
 * Set UI state for if a web3Wallet is connected
 * @param {Boolean} isConnected - Is the web3 wallet connected? 
 * @returns 
 */
export const setWeb3Connected = isConnected => {
    return dispatch => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_WEB3_CONNECTED, payload: isConnected })
    }
};

/**
 * Set the state for if a web3Wallet connection is pending
 * @param {Boolean} busyState - Boolean if web3 is currently attempting to connect  
 * @returns 
 */
export const setWeb3Connecting = busyState => {
    return dispatch => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_WEB3_CONNECTING, payload: busyState })
    }
};

/**
 * Set the currently connected address to redux state
 * @param { String } address - Address to set to state 
 * @returns 
 */
export const setConnectedAddress = address => {
    return dispatch => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_CONNECTED_ADDRESS, payload: address })
    }
}

/**
 * Set the current state for debugMode
 * @param { Boolean } debugMode - State to set for debugMode
 * @returns 
 */
export const setDebugMode = debugMode => {
    return dispatch => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_DEBUG_MODE, payload: debugMode })
    }
}

/**
 * Set balance by accepted tokenType
 * @param {String} balance - String of current balance for tokenType 
 * @returns 
 */
export const setEthereumBalance = (balance) => {
    return dispatch => {
        dispatch({ type: APPLICATION_ACTION_TYPES.SET_ETHEREUM_BALANCE, payload: balance })
    }
};

/**
 * Toggle the tx pending status for application actions
 * @param {ActionType} action - Action to toggle the tx status for
 * @returns 
 */
export const toggleTxPendingStatus = (action) => {
    return dispatch => {
        dispatch({ type: APPLICATION_ACTION_TYPES.TOGGLE_TX_PENDING_STATUS, payload: action })
    }
};

/**
 * Request and update balance state for requested token type
 * @param {TokenType} tokenType 
 * @returns 
 */
export const updateEthereumBalance = tokenType => {
    return async function (dispatch) {
        //
    }
};