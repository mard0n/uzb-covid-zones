
import { combineReducers } from 'redux';
import { default as moneyTransfer } from './landing';

const MoneyTransferReducer:any = combineReducers({
    landing: moneyTransfer,
});

export default MoneyTransferReducer;
