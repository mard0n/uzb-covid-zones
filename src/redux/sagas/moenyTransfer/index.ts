import {all} from 'redux-saga/effects';

import {watchMoneyTransferLandingSaga} from './landingSaga';

// Beneficiaries - BillPayment Saga
export default function*() {
  yield all([
    watchMoneyTransferLandingSaga(),
  ]);
}
