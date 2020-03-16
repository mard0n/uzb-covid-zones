import {takeLatest, call, put} from 'redux-saga/effects';
import * as Endpoints from '../../../../network/Endpoints';
import * as Actions from '../../../actions/beneficiary/billPayment/manageBeneficiaryActions';
import {API} from '../../../../network/index';
// import {API} from '../../../../mocks';

/**
 * @func watchBillPaySaga
 * @description
 */

export function* watchManageSaga() {
  yield takeLatest(
    Actions.ADD_UPDATE_BILL_PAY_BENEFICIARY_REQUEST,
    workerAddUpdateSaga,
  );
}

/**
 * @func addUpdateBillPayBeneficiary
 * @param void
 * @description Add new/update
 */
export function addUpdateBillPayBeneficiary(action: any) {
  const {updateMode = false, data = {}} = action.payload;

  const url = Endpoints.BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT;

  const config = {
    method: updateMode ? 'PATCH' : 'POST',
    data,
    url,
  };
  // console.log('calling with data', data);
  return API(config);
}


/**
 * @func Worker workerAddUpdateSaga
 * @param action
 * @descrption worker for Addupdate Bill pay beneficiary
 */
export function* workerAddUpdateSaga(action: any) {
  // console.log("function*workerAddUpdateSaga -> action =======", action)
  try {
    const response = yield call(addUpdateBillPayBeneficiary, action);
    if (response && response.data) {
      yield put(Actions.addUpdateBeneficiarySuccess(response.data));
      if(response.data.errorCode) {
        yield put(
          Actions.addUpdateBeneficiaryFailure(response.data.errorCode),
        );
      }
    } else {
      yield put(
        Actions.addUpdateBeneficiaryFailure('Invalid data'),
      );
    }
  } catch (error) {
    yield put(Actions.addUpdateBeneficiaryFailure(error));
  }
}