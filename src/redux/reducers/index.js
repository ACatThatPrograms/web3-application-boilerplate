import { combineReducers } from 'redux';
import applicationReducer from './application';
import ethereumReducer from './ethereum';

export default combineReducers({
    ethereum: ethereumReducer,
    application: applicationReducer,
})