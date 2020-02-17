
import { combineReducers } from 'redux';
import { CreateAccountReducer } from './createAcountReducer';

const rootReducers:any = combineReducers({
    createAccount: CreateAccountReducer
});

export default rootReducers;
