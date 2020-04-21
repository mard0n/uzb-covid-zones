
import { combineReducers } from 'redux';
import { CreateAccountReducer } from './createAcountReducer';
import { globalSetupReducer } from "./globalSetupReducer";
import BeneficiaryReducer from "./beneficiary";
import MoneyTransferReducer from './moneyTransfer/index';

const rootReducers:any = combineReducers({
    createAccount: CreateAccountReducer,
    globalState: globalSetupReducer,
    beneficiary: BeneficiaryReducer,
    moneyTransfer:MoneyTransferReducer
});

export default rootReducers;
