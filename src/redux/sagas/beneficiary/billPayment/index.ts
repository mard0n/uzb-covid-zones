import {all} from 'redux-saga/effects';

import {watchManageSaga} from './manageBeneficiarySaga';
import {watchMyBillPaymentBeneficiariesSaga} from './landingSaga';
import {watchAddBillPaymentListSaga} from './addBeneficiaryListSaga';
import { watchDeleteBillPaymentBeneficiarySaga } from './deleteBeneficiarySaga';

// Beneficiaries - BillPayment Saga
export default function*() {
  yield all([
    watchManageSaga(),
    watchMyBillPaymentBeneficiariesSaga(),
    watchAddBillPaymentListSaga(),
    watchDeleteBillPaymentBeneficiarySaga()
  ]);
}
