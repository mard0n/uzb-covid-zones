import {all} from 'redux-saga/effects';

import {watchMyBillPaymentBeneficiariesSaga} from './landingSaga';
import {watchAddBillPaymentListSaga} from './addBeneficiaryListSaga';
import { watchDeleteBillPaymentBeneficiarySaga } from './deleteBeneficiarySaga';

// Beneficiaries - BillPayment Saga
export default function*() {
  yield all([
    watchMyBillPaymentBeneficiariesSaga(),
    watchAddBillPaymentListSaga(),
    watchDeleteBillPaymentBeneficiarySaga()
  ]);
}
