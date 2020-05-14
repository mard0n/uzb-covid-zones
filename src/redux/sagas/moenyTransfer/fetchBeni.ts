import { takeLatest, call, put } from "redux-saga/effects";
import * as Endpoints from "../../../network/Endpoints";
import * as Actions from "../../actions/moneyTransfer/fetchBeni";
import { API } from "../../../network/index";
import { replaceStr } from "../../../util/helper";


/**
 * @func watchMyMoneyTransfersBeneficiariesSaga
 * @description
 */
export function* watchMyMoneyTransfersBeneficiariesSaga() {
  yield takeLatest(
    Actions.FETCH_MONEY_TRANSFER_BENEFICIARIES_REQUEST,
    workerMyMoneyTransfersBeneficiariesSaga,
  );
}

/**
 * @func fetchMyMoneyTransfersBeneficiaries
 * @param void
 * @description fetch my Money Transfer Beneficiaries
 */
export function fetchMyMoneyTransfersBeneficiaries(action: any) {
    const {payload: {type = '', status="ACTIVE", count=1000} = {}} = action;
    const url = replaceStr(Endpoints.MONEY_TRANSFER_BENEFICIARIES_ENDPOINT.replace('type', type).replace("activationStatus",status), 'count', count);
    return API.get(url);
}

/**
 * @func Worker workerMyMoneyTransfersBeneficiariesSaga
 * @param action
 * @descrption worker for My Money TransferBeneficiaries
 */
export function* workerMyMoneyTransfersBeneficiariesSaga(action: any) {
  console.log(' workerMyMoneyTransfersBeneficiariesSaga called');
  try {
    const {data: beneficiaryData = {}} = yield call(
      fetchMyMoneyTransfersBeneficiaries,
      action,
    );
    console.log(
      ' workerMyMoneyTransfersBeneficiariesSaga response',
      beneficiaryData.data.content,
    );
    if (
      beneficiaryData &&
      beneficiaryData.data &&
      beneficiaryData.data.content
    ) {
      const myBeneficiaries = beneficiaryData.data.content;
      console.log('workerMyMoneyTransfersBeneficiariesSaga ', myBeneficiaries);
      yield put(
        Actions.fetchMoneyTransferBeneficiariesSuccess(myBeneficiaries),
      );
    } else {
      yield put(
        Actions.fetchMoneyTransferBeneficiariesFailure({
          errorCode: 'Invalid data',
          message: 'Invalid data',
        }),
      );
    }
  } catch (error) {
    yield put(Actions.fetchMoneyTransferBeneficiariesFailure(error));
  }
}
