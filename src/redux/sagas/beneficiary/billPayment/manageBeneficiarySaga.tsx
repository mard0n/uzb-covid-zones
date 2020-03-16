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
  yield takeLatest(
    Actions.ACTIVATE_BENEFICIARY_REQUEST,
    workerActivateBeneficiary,
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
 * @func startBeneficiaryActivation
 * @param void
 * @description Activate call
 */
export function startBeneficiaryActivation(action: any) {
  const {beneficiaryId = ''} = action.payload;

  const url = Endpoints.ACTIVATE_BENEFICIARY_BY_ID_ENDPOINT.replace(
    'beneficiaryId',
    beneficiaryId,
  );

  const config = {
    method: 'POST',
    url,
  };

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
      yield put(Actions.addUpdateBeneficiarySuccess(response.data.data));
      if(response.data.errorCode) {
        console.log("mas function*workerAddUpdateSaga -> response.data.errorCode", response.data.message);
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

/**
 * @func Worker workerActivateBeneficiary
 * @param action
 * @descrption worker for acivate beneficiary
 */
export function* workerActivateBeneficiary(action: any) {
  try {
    const response = yield call(startBeneficiaryActivation, action);
    // console.log('workerActivateBeneficiary ', response);
    yield put(Actions.activateBeneficiarySuccess(response.data.data));
  } catch (error) {
    yield put(Actions.activateBeneficiaryFailure(error));
  }
}
