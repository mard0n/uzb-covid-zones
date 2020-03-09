import { all } from 'redux-saga/effects';
import { watchBeneficiarySaga } from './beneficiarySaga';

function* rootSaga() {
  yield all([
    watchBeneficiarySaga(),
  ]);
}

export default rootSaga;
