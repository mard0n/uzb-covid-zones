/**
 * Actions Types
 */
export const ADD_UPDATE_BILL_PAY_BENEFICIARY_REQUEST =
  'ADD_UPDATE_BILL_PAY_BENEFICIARY_REQUEST';
export const ADD_UPDATE_BILL_PAY_BENEFICIARY_SUCCESS =
  'ADD_UPDATE__BILL_PAY_BENEFICIARY_SUCCESS';
export const ADD_UPDATE_BILL_PAY_BENEFICIARY_FAILURE =
  'ADD_UPDATE_BILL_PAY_BENEFICIARY_FAILURE';
export const CLEAR_BILL_PAY_BENEFICIARY_ERRORCODE =
  'CLEAR_BILL_PAY_BENEFICIARY_ERRORCODE';

/**
 * @func addUpdateBeneficiaryRequest
 * @param ``
 */
export const addUpdateBeneficiaryRequest = (payload: any) => {
  return ({
  type: ADD_UPDATE_BILL_PAY_BENEFICIARY_REQUEST,
  payload,
})};

export const addUpdateBeneficiarySuccess = (payload: any) => {
  return ({
  type: ADD_UPDATE_BILL_PAY_BENEFICIARY_SUCCESS,
  payload,
})};

export const addUpdateBeneficiaryFailure = (payload: any) => ({
  type: ADD_UPDATE_BILL_PAY_BENEFICIARY_FAILURE,
  payload,
});
export const clearBeneficiaryErrorCode = () => ({
  type: ADD_UPDATE_BILL_PAY_BENEFICIARY_FAILURE
});