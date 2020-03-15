/**
 * Actions Types
 */
export const DELETE_BILL_PAYMENT_BENEFICIARIES_REQUEST =
  'DELETE_BILL_PAYMENT_BENEFICIARIES_REQUEST';
export const DELETE_BILL_PAYMENT_BENEFICIARIES_SUCCESS =
  'DELETE_BILL_PAYMENT_BENEFICIARIES_SUCCESS';
export const DELETE_BILL_PAYMENT_BENEFICIARIES_FAILURE =
  'DELETE_BILL_PAYMENT_BENEFICIARIES_FAILURE';

/**
 * @func deleteBeneficiaryRequest
 * @param ``
 */
export const deleteBeneficiaryRequest = (beneficiaryId: string) => {
  return {
  type: DELETE_BILL_PAYMENT_BENEFICIARIES_REQUEST,
  beneficiaryId,
}};

export const deleteBeneficiarySuccess = (payload: any) => {
  return {
    type: DELETE_BILL_PAYMENT_BENEFICIARIES_SUCCESS,
    payload,
  };
};

export const deleteBeneficiaryFailure = (payload: any) => ({
  type: DELETE_BILL_PAYMENT_BENEFICIARIES_FAILURE,
  payload,
});