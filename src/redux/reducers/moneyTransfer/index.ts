
import { combineReducers } from 'redux';
import { default as moneyTransferLanding } from './landing';
import { default as moneyTransferPayList} from './payList';
import currencyConverterReducer from './currencyConverterReducer';


const MoneyTransferReducer:any = combineReducers({
    landing: moneyTransferLanding,
    curency: currencyConverterReducer,
    other:moneyTransferPayList
});

export default MoneyTransferReducer;
