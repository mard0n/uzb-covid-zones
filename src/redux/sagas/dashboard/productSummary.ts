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
  yield takeLatest(Actions.PRODUCT_SUMMARY_INSURANCE_REQUEST, workerInsurance);
  yield takeLatest(Actions.PRODUCT_SUMMARY_MM_REQUEST, workerMM);
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
export function getMM() {
  const url = Endpoints.PRODUCT_MM_ENDPOINT;
  return API.get(url);
}

/**
 * @func Worker workerMM
 */
export function* workerMM(action: any) {
  try {
    const response = yield call(getMM);
    yield put(Actions.requestMMSuccess(response.data.data));
  } catch (error) {
    yield put(Actions.requestMMFailure(error));
  }
}


/**
 * @func getCards
 */
export function getInsurance() {
  const url = Endpoints.PRODUCT_INSURANCE_ENDPOINT;
  return API.get(url);
}

/**
 * @func Worker workerInsurance
 */
export function* workerInsurance(action: any) {
  try {
    const response = yield call(getInsurance);
    yield put(Actions.requestInsuranceSuccess(response.data.data));
  } catch (error) {
    yield put(Actions.requestInsuranceFailure(error));
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
