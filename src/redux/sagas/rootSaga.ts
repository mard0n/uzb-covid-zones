import { all } from 'redux-saga/effects';
import { default as watchDashboardSaga } from './dashboard';
import { default as watchBeneficiarySaga } from './beneficiary';
import { default as watchMoneyTransferLandingSaga } from './moenyTransfer';


function* rootSaga() {
  yield all([
    watchDashboardSaga(),
    watchBeneficiarySaga(),
    watchMoneyTransferLandingSaga()
  ]);
}

export default rootSaga;
