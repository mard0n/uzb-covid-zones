import {takeLatest, call, put} from 'redux-saga/effects';
import * as Actions from '../../actions/dashboard/productSummary';
import * as Endpoints from '../../../network/Endpoints';
import {API} from '../../../network/index';
// import {API} from '../../../../mocks';

/**
 * @func watchSignIn
 * @description Watch SignIn
 */

export function* watchProductSummarySaga() {
  yield takeLatest(
    Actions.PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST,
    workerAccLoanDep,
  );
  yield takeLatest(Actions.PRODUCT_SUMMARY_CARD_REQUEST, workerCard);
  yield takeLatest(Actions.PRODUCT_SUMMARY_REWARDS_REQUEST, workerSalaamRewardCard);
}

/**
 * @func getAccLoanDep
 * @param void
 */
export function getAccLoanDep() {
  const url = Endpoints.PRODUCT_SUMMARY_ACC_LOAN_DEP_ENDPOINT;
  return API.get(url);
}

/**
 * @func Worker workerAccLoanDep
 * @param action
 * @descrption
 */
export function* workerAccLoanDep(action: any) {
  try {
    const response = yield call(getAccLoanDep);
    yield put(Actions.requestAccLoanDepSuccess(response.data.data));
  } catch (error) {
    yield put(Actions.requestAccLoanDepFailure(error));
  }
}

/**
 * @func getCards
 */
export function getCards() {
  const url = Endpoints.PRODUCT_SUMMARY_CARD_ENDPOINT;
  return API.get(url);
}

/**
 * @func Worker workerCard
 */
export function* workerCard(action: any) {
  try {
    const response = yield call(getCards);
    console.log('workerCard', response);
    yield put(Actions.requestCardsSuccess(response.data.data));
  } catch (error) {
    yield put(Actions.requestCardsFailure(error));
  }
}

/**
 * @func getSalaamRewards
 */
export function getSalaamRewards() {
  const url = Endpoints.PRODUCT_SUMMARY_REWARDS_ENDPOINT;
  return API.get(url);
}

/**
 * @func Worker workerCard
 */
export function* workerSalaamRewardCard(action: any) {
  try {
    const response = yield call(getSalaamRewards);
    yield put(Actions.requestRewardSuccess(response.data.data));
  } catch (error) {
    yield put(Actions.requestRewardFailure(error));
  }
}
