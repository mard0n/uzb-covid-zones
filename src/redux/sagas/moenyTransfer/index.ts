import {all} from 'redux-saga/effects';

import {watchMoneyTransferLandingSaga} from './landingSaga';
import {watchPayListSaga} from './payListSaga';


// Beneficiaries - BillPayment Saga
export default function*() {
  yield all([
    watchMoneyTransferLandingSaga(),
    watchPayListSaga()
  ]);
}
