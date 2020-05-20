import {takeLatest, debounce, call, put} from 'redux-saga/effects';
import * as Actions from '../actions/currencyConverterActions';
import * as Endpoints from "../../network/Endpoints";
import { API } from "../../network/index";

/**
 * @func watchCurrencyRateSaga
 * @description
 */
export function* watchCurrencyRateSaga() {
  yield takeLatest(Actions.FETCH_CURRENT_RATE_REQUEST, workerCurrencyRateSaga);
  yield debounce(
    2000,
    Actions.DEBOUNCE_CURRENT_RATE_REQUEST,
    workerCurrencyRateSaga,
  );
}

/**
 * @func fetchCurrencyRate
 * @param void
 * @description fetch my currency rate
 */
export function fetchCurrencyRate(action: any) {
  const {data = {}} = action.payload;
  const url = Endpoints.MONEY_TRANSFER_CURRENCY_EXCHANGE_ENDPOINT;
  const config = {
    config: { method: "POST" },
    url,
    data,
  };
  console.log('fetchCurrencyRate data', action);

  return API(config);
}

/**
 * @func Worker workerCurrencyRateSaga
 * @param action
 * @descrption worker for currency rate
 */
export function* workerCurrencyRateSaga(action: any) {
  console.log(' workerCurrencyRateSaga called');
  try {
    yield put(Actions.debounceExecuting());
    const response = yield call(fetchCurrencyRate, action);
    console.log(' workerCurrencyRateSaga response', response);
    if (response && response.data && response.data.data) {
      console.log('workerCurrencyRateSaga ', response.data.data);
      yield put(Actions.fetchCurrencyRateSuccess(response.data.data));
    } else {
      yield put(
        Actions.fetchCurrencyRateFailure({
          errorCode: 'Invalid data',
          message: 'Invalid data',
        }),
      );
    }
  } catch (error) {
    yield put(Actions.fetchCurrencyRateFailure(error));
  }
}
