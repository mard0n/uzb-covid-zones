
import { combineReducers } from 'redux';
import { CreateAccountReducer } from './createAcountReducer';
import { globalSetupReducer } from "./globalSetupReducer";
import BeneficiaryReducer from "./beneficiary";
import MoneyTransferReducer from './moneyTransfer/index';
import ProductSummary from './products';

const rootReducers:any = combineReducers({
    createAccount: CreateAccountReducer,
    globalState: globalSetupReducer,
    products: ProductSummary,
    beneficiary: BeneficiaryReducer,
    moneyTransfer:MoneyTransferReducer
});

export default rootReducers;
