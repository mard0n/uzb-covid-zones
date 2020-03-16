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
export const CLEAR_BILL_PAY_BENEFICIARY_ADD_NEW =
  'CLEAR_BILL_PAY_BENEFICIARY_ADD_NEW';

export const ACTIVATE_BENEFICIARY_REQUEST = 'ACTIVATE_BENEFICIARY_REQUEST';
export const ACTIVATE_BENEFICIARY_SUCCESS = 'ACTIVATE_BENEFICIARY_SUCCESS';
export const ACTIVATE_BENEFICIARY_FAILURE = 'ACTIVATE_BENEFICIARY_FAILURE';

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
export const clearBeneficiaryAddNew = () => ({
  type: CLEAR_BILL_PAY_BENEFICIARY_ADD_NEW
});


/**
 * @func activateBeneficiaryRequest
 * @param ``
 */
export const activateBeneficiaryRequest = (payload: any) => ({
  type: ACTIVATE_BENEFICIARY_REQUEST,
  payload,
});

export const activateBeneficiarySuccess = (payload: any) => ({
  type: ACTIVATE_BENEFICIARY_SUCCESS,
  payload,
});

export const activateBeneficiaryFailure = (payload: any) => ({
  type: ACTIVATE_BENEFICIARY_FAILURE,
  payload,
});
