import { all } from 'redux-saga/effects';
import { default as watchBeneficiarySaga } from './beneficiary';

function* rootSaga() {
  yield all([
    watchBeneficiarySaga(),
  ]);
}

export default rootSaga;
