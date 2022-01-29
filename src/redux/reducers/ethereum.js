/** @module rdux_application_reducer */

import { ETHEREUM_ACTION_TYPES } from "redux/constants";

const initialEthereumState = {
    accounts: [],
    balances: {
        ethereum: "0",
    },
    balancesLoading: false,
    connected: false,
    connectedAccount: "",
    connecting: false,
    networkId: "",
    networkName: "",
};

export default function applicationReducer(state = initialEthereumState, action) {
    switch (action.type) {
        // TODO: Automate depth, so it isn't limited to two layers
        // Expects action.payload.keychain, and action.payload.value
        case ETHEREUM_ACTION_TYPES.UPDATE_ETHEREUM_INSTANCE_STATE_BY_KEYCHAIN:
            let keyDepth = action.payload.keychain.length;
            let keyTargets = action.payload.keychain;
            let newState = { ...state };
            if (keyDepth === 1) {
                newState[keyTargets[0]] = action.payload.value;
            } else if (keyDepth === 2) {
                // Create non-existent object if needed
                if (!newState[keyTargets[0]]) {
                    newState[keyTargets[0]] = {};
                }
                newState[keyTargets[0]][keyTargets[1]] = action.payload.value;
            }
            else { // Fallback to prev state
                console.warn("Falling back to previous state during UPDATE_ETHEREUM_INSTANCE_STATE_BY_KEYCHAIN, verify keyChain accessors and value set on payload correctly with no more than 2 depth keychain.")
                newState = { ...state.madNetAdapter }
            }
            return Object.assign({}, state, newState);
        default:
            return state;
    }
};