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
console.log("fetchPayList -> action", action);

  const {payload: {type = ''} = {}} = action;
  const url = Endpoints.PAY_LIST_OWN_ACOUNT.replace('type', type);
  return API.get(url);
}

/**
 * @func fetchPayList
 * @param void
 * @description fetch Money Transfer for PayList Own Acount
 */
export function fetchBeniList(action: any) {
      const {payload: {type = ''} = {}} = action;
    const url = Endpoints.MONEY_TRANSFER_BENEFICIARIES_ENDPOINT_Static;
    return API.get(url);
  }

/**
 * @func Worker workerPayListSaga
 * @param action
 * @descrption worker for Money Transfer
 */
export function* workerPayListSaga(action: any) {  
  try {
    const {payload: {type = ''} = {}} = action;
    const { data: beniList = {} } = yield call(
      fetchBeniList,
      action
    );
    console.log("function*workerPayListSaga -> beniList gubad", beniList)
    const { data: payListData = {} } = yield call(
      fetchPayList,
      action
    );

    console.log("function*workerPayListSaga -> payListData", payListData);

    if (payListData && payListData.data) {
      if(type === "within-mashreq"){
        payListData.data.destination = beniList.data;
      console.log("function*workerPayListSaga -> payListData gubad", payListData)
      yield put(Actions.fetchPayListSuccess(payListData.data));
      }else{
        yield put(Actions.fetchPayListSuccess(payListData.data));
      }
    }
  } catch (error) {
    yield put(Actions.fetchPayListFailure(error));
  }
}
