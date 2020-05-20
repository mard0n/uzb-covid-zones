import { takeLatest, call, put } from "redux-saga/effects";
import * as Endpoints from "../../../network/Endpoints";
import * as Actions from "../../actions/moneyTransfer/landingActions";
import { API } from "../../../network/index";
// import {API} from '../../../../mocks';

/**
 * @func watchMoneyTransferLandingSaga
 * @description
 */
export function* watchMoneyTransferLandingSaga() {
  yield takeLatest(
    Actions.FETCH_MONEY_TRANSFER_LANDING_REQUEST,
    workerMoneyTransferLandingSaga
  );
}

/**
 * @func fetchMoneyTransferLanding
 * @param void
 * @description fetch Money Transfer
 */
export function fetchMoneyTransferLanding(action: any) {
  const url = Endpoints.MONEY_TRANSFER_LANDING;
  return API.get(url);
}

/**
 * @func Worker workerMoneyTransferLandingSaga
 * @param action
 * @descrption worker for Money Transfer
 */
export function* workerMoneyTransferLandingSaga(action: any) {
  try {
    const { data: moneyTransferData = {} } = yield call(
      fetchMoneyTransferLanding,
      action
    );
    if (moneyTransferData && moneyTransferData.data) {
      const serviceTypes = moneyTransferData.data[0].serviceTypes;

      yield put(Actions.fetchMoneyTransferLandingSuccess(serviceTypes));
    }
  } catch (error) {
    yield put(Actions.fetchMoneyTransferLandingFailure(error));
  }
}
