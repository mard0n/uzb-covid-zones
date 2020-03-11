import {takeLatest, call, put} from 'redux-saga/effects';
import * as Endpoints from '../network/Endpoints';
import * as Actions from '../actions/beneficiaryActions';
import {API} from '../network/index';
// import {API} from '../mocks';

export function* watchBeneficiarySaga() {
  console.log('watchBeneficiarySaga ');
  // yield takeLatest(
  //   Actions.FETCH_RECHARGE_BILL_PAYMENTS_REQUEST,
  //   workerRechargeBillPaymentsSaga,
  // );
  yield takeLatest(
    Actions.FETCH_BENEFICIARY_SERVICE_TYPES,
    workerServiceTypesSaga,
  );
}

export function fetchServiceTypesSaga(action: any) {
  const url = Endpoints.BENEFICIARY_SERVICE_TYPES_ENDPOINT;
  // const config = {
  //   method: 'GET',
  //   url,
  //   headers: {'X-CIF-ID': CIF}, //TODO: CIF 012344355 for all Beneficiries 010424124
  // };
  return API.get(url);
}

const getRestructuredData = (data: any) => {
  let mo: any = [];
  Object.keys(data).forEach(itemKey => {
    const p = data;
    const c = p[itemKey];
    const child: Array<object> = [];
    Object.keys(c).forEach(cKey => {
      let ch: any = {};
      ch['name'] = cKey;
      ch['data'] = c[cKey];
      if (c[cKey].length > 1) child.push(ch);
      else child.push(c[cKey][0]);
    });
    mo.push({
      name: itemKey,
      data: [...child],
    });
  });
  return mo;
};


export function* workerServiceTypesSaga(action: any) {
  try {
    const response = yield call(fetchServiceTypesSaga, action);
    if (response && response.data && response.data.data) {
      getRestructuredData(response.data.data);
      yield put(
        Actions.fetchBeneficiaryServiceTypeSuccess(
          getRestructuredData(response.data.data),
        ),
      );
    }
  } catch (error) {
    yield put(Actions.fetchBeneficiaryServiceTypeFailure(error));
  }
}