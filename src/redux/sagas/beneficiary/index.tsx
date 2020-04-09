import {all} from 'redux-saga/effects';

import {default as watchBeneficiaryBillPaymentSaga} from './billPayment';

// Beneficiaries Saga
export default function*() {
  yield all([watchBeneficiaryBillPaymentSaga()]);
}
