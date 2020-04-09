import {takeLatest, call, put} from 'redux-saga/effects';
import * as Endpoints from '../../../../network/Endpoints';
import * as Actions from '../../../actions/beneficiary/billPayment/landingActions';
import {API} from '../../../../network/index';
// import {API} from '../../../../mocks';

/**
 * @func watchMyBillPaymentBeneficiariesSaga
 * @description
 */
export function* watchMyBillPaymentBeneficiariesSaga() {
  yield takeLatest(
    Actions.FETCH_BILL_PAYMENT_BENEFICIARIES_REQUEST,
    workerMyBillPaymentBeneficiariesSaga,
  );
}

/**
 * @func fetchMyBillPaymentBeneficiaries
 * @param void
 * @description fetch my Bill Payments Beneficiaries
 */
export function fetchMyBillPaymentBeneficiaries(action: any) {
  const url = Endpoints.MY_BILL_PAYMENT_BENEFICIARES_ENDPOINT;
  return API.get(url);
}

/**
 * @func Worker workerMyBillPaymentBeneficiariesSaga
 * @param action
 * @descrption worker for My Bill Payment Beneficiaries
 */
export function* workerMyBillPaymentBeneficiariesSaga(action: any) {
  try {
    const {data: beneficiaryData = {}} = yield call(
      fetchMyBillPaymentBeneficiaries,
      action,
    );
    if (beneficiaryData && beneficiaryData.data) {
      const myBeneficiaries = beneficiaryData.data
        .filter((item: any) => item.beneficiaries && item.beneficiaries.length > 0)
        .map((item: any) => {
        
          let beneficiaryList = [...item.beneficiaries];
          if(item.category === "Telecom") {
            beneficiaryList.map((dList: any)=>(
              dList["serviceTypeCodeTel"] = dList["serviceTypeCode"].indexOf("etisalat") > -1 ? "etisalat" : "du"
            ))
          }
          return {
          sectionLabel: item.category ? item.category : '',
          data: beneficiaryList,
        }});
      yield put(Actions.fetchBillPaymentBeneficiariesSuccess(myBeneficiaries));
    }
  } catch (error) {
    yield put(Actions.fetchBillPaymentBeneficiariesFailure(error));
  }
}
