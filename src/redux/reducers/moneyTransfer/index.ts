
import { combineReducers } from 'redux';
import { default as moneyTransferLanding } from './landing';
import { default as moneyTransferPayList} from './payList';
import { default as moneyTransferBenifichiary} from './fetchBani';

import currencyConverterReducer from './currencyConverterReducer';
import { getBasicReducer } from '../../../util/reducer';
import * as Actions from "../../actions/moneyTransfer/transaction"

const MoneyTransferReducer:any = combineReducers({
    landing: moneyTransferLanding,
    currencyConverter: currencyConverterReducer,
    other:moneyTransferPayList,
    mtBeni:moneyTransferBenifichiary,
    makeTransfer: getBasicReducer({
        success: Actions.MONEY_TRANSFER_INITIATE_TRANSFER_SUCCESS,
        request: Actions.MONEY_TRANSFER_INITIATE_TRANSFER_REQUEST,
        failure: Actions.MONEY_TRANSFER_INITIATE_TRANSFER_FAILURE,
        clear: Actions.MONEY_TRANSFER_INITIATE_TRANSFER_CLEAR,
      })
});

export default MoneyTransferReducer;
