import {takeLatest, call, put} from 'redux-saga/effects';
import * as Endpoints from '../../../../network/Endpoints';
import * as Actions from '../../../actions/beneficiary/billPayment/manageBeneficiaryActions';
import * as LandingActions from "../../../actions/beneficiary/billPayment/landingActions";

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
    Actions.EDIT_BILL_PAY_BENEFICIARY_REQUEST,
    workerEditSaga,
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
  return API(config);
}

/**
 * @func editBillPayBeneficiary
 * @param void
 * @description Add new/update
 */
export function editBillPayBeneficiary(action: any) {
  const {data = {}} = action.payload;

  const url = Endpoints.BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT;

  const config = {
    method: 'PATCH',
    data,
    url,
  };
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
 * @func Worker workerEditSaga
 * @param action
 * @descrption worker for Edit Bill pay beneficiary
 */
export function* workerEditSaga(action: any) {
  try {
    const response = yield call(editBillPayBeneficiary, action);
    if (response && response.data) {
      yield put(Actions.editBeneficiarySuccess(response.data.data));
      yield put(LandingActions.fetchBillPaymentBeneficiariesRequest());

      // dispatch()
      if(response.data.errorCode) {
        yield put(
          Actions.editBeneficiaryFailure(response.data.errorCode),
        );
      }
    } else {
      yield put(
        Actions.editBeneficiaryFailure('Invalid data'),
      );
    }

  } catch (error) {
    yield put(Actions.editBeneficiaryFailure(error));
  }
}

/**
 * @func Worker workerAddUpdateSaga
 * @param action
 * @descrption worker for Addupdate Bill pay beneficiary
 */
export function* workerAddUpdateSaga(action: any) {
  try {
    const response = yield call(addUpdateBillPayBeneficiary, action);
    if (response && response.data) {
      yield put(Actions.addUpdateBeneficiarySuccess(response.data.data));
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

/**
 * @func Worker workerActivateBeneficiary
 * @param action
 * @descrption worker for acivate beneficiary
 */
export function* workerActivateBeneficiary(action: any) {
  try {
    const response = yield call(startBeneficiaryActivation, action);
    yield put(Actions.activateBeneficiarySuccess(response.data.data));
  } catch (error) {
    yield put(Actions.activateBeneficiaryFailure(error));
  }
}
