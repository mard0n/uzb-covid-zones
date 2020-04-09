
import { combineReducers } from 'redux';
import { default as BillPayment } from './billPayment';

const BeneficiaryReducer:any = combineReducers({
    billPayment: BillPayment,
});

export default BeneficiaryReducer;
