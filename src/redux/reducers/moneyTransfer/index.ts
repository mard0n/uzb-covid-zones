
import { combineReducers } from 'redux';
import { default as moneyTransferLanding } from './landing';
import { default as moneyTransferPayList} from './payList';


const MoneyTransferReducer:any = combineReducers({
    landing: moneyTransferLanding,
    other:moneyTransferPayList
});

export default MoneyTransferReducer;
