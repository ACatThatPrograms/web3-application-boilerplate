import { combineReducers } from 'redux';
import applicationReducer from './application';

import { configureReduxCombatibleAdapter } from 'eth-adapter';
let [ethAdapterReducer] = configureReduxCombatibleAdapter("http://localhost:8545");

export default combineReducers({
    ethereum: ethAdapterReducer,
    application: applicationReducer,
})