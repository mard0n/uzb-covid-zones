import {all} from 'redux-saga/effects';

import {default as watchBillPaymentSaga} from './billPayment';

// Beneficiaries Saga
export default function*() {
  yield all([watchBillPaymentSaga()]);
}
