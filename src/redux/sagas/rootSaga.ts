import { all } from 'redux-saga/effects';
import { default as watchBeneficiarySaga } from './beneficiary';
import { default as watchMoneyTransferLandingSaga } from './moenyTransfer';
import { watchCurrencyRateSaga } from './currencyConverterSaga';


function* rootSaga() {
  yield all([
    watchBeneficiarySaga(),
    watchMoneyTransferLandingSaga(),
    watchCurrencyRateSaga()
  ]);
}

export default rootSaga;
