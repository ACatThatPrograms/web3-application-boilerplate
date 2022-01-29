/** @module ethereum_actions */

import { ETHEREUM_ACTION_TYPES } from 'redux/constants';

/**
 * Updates ethereum state reducer by provided keychain and value
 * @param {Array<String>} keychain - Keychain to update 
 * @param { Object } value - Value to set to state
 */
export const updateEthereumStateByKeychainValue = (keychain, value) => {
    return dispatch => {
        dispatch({ type: ETHEREUM_ACTION_TYPES.UPDATE_ETHEREUM_INSTANCE_STATE_BY_KEY, payload: { keychain: keychain, value: value } })
    }
};