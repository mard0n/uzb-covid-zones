import { takeLatest, call, put } from "redux-saga/effects";
import * as Endpoints from "../../../network/Endpoints";
import * as Actions from "../../actions/moneyTransfer/payListActions";
import { API } from "../../../network/index";
// import {API} from '../../../../mocks';

/**
 * @func watchPayListSaga
 * @description
 */
export function* watchPayListSaga() {
  yield takeLatest(
    Actions.FETCH_PAY_LIST_REQUEST,
    workerPayListSaga
  );
}

/**
 * @func fetchPayList
 * @param void
 * @description fetch Money Transfer for PayList Own Acount
 */
export function fetchPayList(action: any) {
  const {payload: {type = ''} = {}} = action;
  const url = Endpoints.PAY_LIST_OWN_ACOUNT.replace('type', type);
  return API.get(url);
}


/**
 * @func Worker workerPayListSaga
 * @param action
 * @descrption worker for Money Transfer
 */
export function* workerPayListSaga(action: any) {  
  try {
    const { data: payListData = {} } = yield call(
      fetchPayList,
      action
    );
    if (payListData && payListData.data) {
      yield put(Actions.fetchPayListSuccess(payListData.data));
    }
  } catch (error) {
    yield put(Actions.fetchPayListFailure(error));
  }
}
