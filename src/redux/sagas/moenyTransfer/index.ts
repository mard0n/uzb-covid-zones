import {all} from 'redux-saga/effects';

import {watchMoneyTransferLandingSaga} from './landingSaga';
import {watchPayListSaga} from './payListSaga';
import {watchMoneyTransferInitiateSaga} from "./transfer";

// Beneficiaries - BillPayment Saga
export default function*() {
  yield all([
    watchMoneyTransferLandingSaga(),
    watchPayListSaga(),
    watchMoneyTransferInitiateSaga()
  ]);
}
