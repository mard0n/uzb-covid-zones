import { takeLatest, call, put } from "redux-saga/effects";
import * as Endpoints from "../../../network/Endpoints";
import * as Actions from "../../actions/moneyTransfer/transaction";
import { API } from "../../../network/index";

/**
 * @func watchMoneyTransferLandingSaga
 * @description
 */
export function* watchMoneyTransferInitiateSaga() {
  yield takeLatest(
    Actions.MONEY_TRANSFER_INITIATE_TRANSFER_REQUEST,
    workerMoneyTransferInitiateSaga
  );
}

/**
 * @func fetchMoneyTransferInitiate
 * @param void
 * @description fetch Money Transfer
 */
export function fetchMoneyTransferInitiate(action: any) {
  const { payload = {} } = action;
  const url = Endpoints.MONEY_TRANSFER_INITIATE_TRANSFER_ENDPOINT;

  const config = {
    config: { method: "POST" },
    url,
    data: { ...payload },
    //headers: {'X-CIF-ID': CIF}, //TODO: CIF 010424127  010424124
  };
  return API(config);
}

/**
 * @func Worker workerMoneyTransferInitiateSaga
 * @param action
 * @descrption worker for Money Transfer
 */
export function* workerMoneyTransferInitiateSaga(action: any) {
  try {
    console.log("Money transfer called.... pyr ", action);
    const response = yield call(fetchMoneyTransferInitiate, action);
    console.log("Money response.... pyr ", response.data);
    
    if (response.data.hasError) {
      console.log("ERROR --", response.data.errorMessage);
      yield put(
        Actions.moneyTransferInitiateTransferFailure(response.data.errorMessage)
      );
    } else if (response.data.data) {
      yield put(
        Actions.moneyTransferInitiateTransferSuccess(response.data.data)
      );
    } else {
      Actions.moneyTransferInitiateTransferFailure(response.data.errorMessage);
    }


  } catch (error) {
    console.log("ERROR --", error);
    yield put(Actions.moneyTransferInitiateTransferFailure(error));
  }
}
