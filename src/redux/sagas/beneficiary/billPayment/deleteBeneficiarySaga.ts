import {takeLatest, call, put} from 'redux-saga/effects';
import * as Endpoints from '../../../../network/Endpoints';
import * as Actions from '../../../actions/beneficiary/billPayment/deleteBillPaymentActions';
import * as LandingActions from '../../../actions/beneficiary/billPayment/landingActions';
import {API} from '../../../../network/index';
// import {API} from '../mocks';

/**
 * @func watchDeleteBillPaymentBeneficiarySaga
 * @description
 */
export function* watchDeleteBillPaymentBeneficiarySaga() {
  yield takeLatest(
    Actions.DELETE_BILL_PAYMENT_BENEFICIARIES_REQUEST,
    workerDeleteBillPaymentBeneficiarySaga,
  );
}

/**
 * @func deleteBillPaymentBeneficiaries
 * @param void
 * @description delete my Bill Payments Beneficiariy
 */
export function deleteBillPaymentBeneficiaries(beneficiaryId: string) {
  const url = Endpoints.DELETE_BENEFICIARY_BY_ID_ENDPOINT.replace(
    'beneficiaryId',
    beneficiaryId,
  );
  return API.delete(url);
}

/**
 * @func Worker workerDeleteBillPaymentBeneficiarySaga
 * @param action
 * @descrption worker for delete My Bill Payment Beneficiary
 */
export function* workerDeleteBillPaymentBeneficiarySaga(action: any) {
  try {
    const response = yield call(
      deleteBillPaymentBeneficiaries,
      action.beneficiaryId,
    );
    if (response.status === 200) {
      yield put(Actions.deleteBeneficiarySuccess({success: true}));
      /* Delete - update myBill redux*/
      yield put(LandingActions.fetchBillPaymentBeneficiariesRequest());
    } else {
      yield put(Actions.deleteBeneficiaryFailure({success: false}));
    }
  } catch (error) {
    yield put(Actions.deleteBeneficiaryFailure({success: false}));
    // yield put(Actions.deleteBeneficiaryRequest(error));
  }
}
