/**
 * Actions Types
 */
export const FETCH_BILL_PAYMENT_BENEFICIARIES_REQUEST =
  "FETCH_BILL_PAYMENT_BENEFICIARIES_REQUEST";
export const FETCH_BILL_PAYMENT_BENEFICIARIES_SUCCESS =
  "FETCH_BILL_PAYMENT_BENEFICIARIES_SUCCESS";
export const FETCH_BILL_PAYMENT_BENEFICIARIES_FAILURE =
  "FETCH_BILL_PAYMENT_BENEFICIARIES_FAILURE";

  export const CREATE_NEW_BILL_PAYMENT_BENEFICIARIES_REQUEST =
  "CREATE_NEW_BILL_PAYMENT_BENEFICIARIES_REQUEST";
export const CREATE_NEW_BILL_PAYMENT_BENEFICIARIES_CLEAR =
  "CREATE_NEW_BILL_PAYMENT_BENEFICIARIES_CLEAR";

/**
 * @func fetchBillPaymentBeneficiariesRequest
 * @param ``
 */
export const fetchBillPaymentBeneficiariesRequest = () => ({
  type: FETCH_BILL_PAYMENT_BENEFICIARIES_REQUEST
});

export const fetchBillPaymentBeneficiariesSuccess = (payload: any) => ({
  type: FETCH_BILL_PAYMENT_BENEFICIARIES_SUCCESS,
  payload
});

export const fetchBillPaymentBeneficiariesFailure = (payload: any) => ({
  type: FETCH_BILL_PAYMENT_BENEFICIARIES_FAILURE,
  payload
});

/**
 * @func createBillPaymentBeneficiaries
 * @param ``
 */
export const createNewBillPaymentBeneficiariesRequest = (payload: any) => ({
  type: CREATE_NEW_BILL_PAYMENT_BENEFICIARIES_REQUEST,
  payload
});

export const clearNewBillPaymentBeneficiaries = () => ({
  type: CREATE_NEW_BILL_PAYMENT_BENEFICIARIES_CLEAR
});

