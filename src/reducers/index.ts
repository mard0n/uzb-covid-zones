
import { combineReducers } from 'redux';
import { CreateAccountReducer } from './createAcountReducer';
import { globalSetupReducer } from "./globalSetupReducer";

const rootReducers:any = combineReducers({
    createAccount: CreateAccountReducer,
    globalState: globalSetupReducer
});

export default rootReducers;
