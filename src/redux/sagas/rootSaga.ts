import { all } from 'redux-saga/effects';
import { default as watchBeneficiarySaga } from './beneficiary';
import { default as watchMoneyTransferLandingSaga } from './moenyTransfer';


function* rootSaga() {
  yield all([
    watchBeneficiarySaga(),
    watchMoneyTransferLandingSaga()
  ]);
}

export default rootSaga;
