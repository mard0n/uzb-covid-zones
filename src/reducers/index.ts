
import { combineReducers } from 'redux';
import { CreateAccountReducer } from './createAcountReducer';
import { globalSetupReducer } from "./globalSetupReducer";
import BeneficiaryReducer from "./beneficiaryReducer";

const rootReducers:any = combineReducers({
    createAccount: CreateAccountReducer,
    globalState: globalSetupReducer,
    beneficiary: BeneficiaryReducer
});

export default rootReducers;
