import { APPLICATION_ACTION_TYPES } from "redux/constants";

const initialApplicationState = {
    web3Connected: false,
    web3Connecting: false,
    debugMode: false,
    balancesLoading: false,
    balances: {
        ethereum: 0,
    },
    connectedAddress: "",
};

export default function applicationReducer(state = initialApplicationState, action) {
    switch (action.type) {


        case APPLICATION_ACTION_TYPES.SET_BALANCES_LOADING:
            return Object.assign({}, state, {
                balancesLoading: action.payload,
            })

        case APPLICATION_ACTION_TYPES.SET_CONNECTED_ADDRESS:
            return Object.assign({}, state, {
                connectedAddress: action.payload
            });

        case APPLICATION_ACTION_TYPES.SET_DEBUG_MODE:
            return Object.assign({}, state, {
                debugMode: action.payload
            });

        case APPLICATION_ACTION_TYPES.SET_ETHEREUM_BALANCE:
            return Object.assign({}, state, {
                balances: { ...state.balances, ethereum: action.payload },
            });

        case APPLICATION_ACTION_TYPES.SET_WEB3_CONNECTED:
            return Object.assign({}, state, {
                web3Connected: action.payload
            });

        case APPLICATION_ACTION_TYPES.SET_WEB3_CONNECTING:
            return Object.assign({}, state, {
                web3Connecting: action.payload
            });

        default:
            return state;

    }
};