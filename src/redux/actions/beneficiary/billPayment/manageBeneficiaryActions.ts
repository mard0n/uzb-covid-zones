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

  export const EDIT_BILL_PAY_BENEFICIARY_REQUEST =
  'EDIT_BILL_PAY_BENEFICIARY_REQUEST';
export const EDIT_BILL_PAY_BENEFICIARY_SUCCESS =
  'EDIT__BILL_PAY_BENEFICIARY_SUCCESS';
export const EDIT_BILL_PAY_BENEFICIARY_FAILURE =
  'EDIT_BILL_PAY_BENEFICIARY_FAILURE';

export const ACTIVATE_BENEFICIARY_REQUEST = 'ACTIVATE_BENEFICIARY_REQUEST';
export const ACTIVATE_BENEFICIARY_SUCCESS = 'ACTIVATE_BENEFICIARY_SUCCESS';
export const ACTIVATE_BENEFICIARY_FAILURE = 'ACTIVATE_BENEFICIARY_FAILURE';

export const EDIT_ADD_MODEL=
'EDIT_ADD_MODEL';


/**
 * @func addUpdateBeneficiaryRequest
 * @param ``
 */
export const addUpdateBeneficiaryRequest = (payload: any) => {
  console.log("addUpdateBeneficiaryRequest -> payload masood", payload)
  return ({
  type: ADD_UPDATE_BILL_PAY_BENEFICIARY_REQUEST,
  payload,
})};

export const addUpdateBeneficiarySuccess = (payload: any) => {
  console.log("addUpdateBeneficiarySuccess -> payload masood ====>", payload)

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
 * @func editBeneficiaryRequest
 * @param ``
 */
export const editBeneficiaryRequest = (payload: any) => {
  return ({
  type: EDIT_BILL_PAY_BENEFICIARY_REQUEST,
  payload,
})};

export const editBeneficiarySuccess = (payload: any) => {
  //console.log("editBeneficiarySuccess -> payload ====>", payload)
  return ({
  type: EDIT_BILL_PAY_BENEFICIARY_SUCCESS,
  payload,
})};

export const editBeneficiaryFailure = (payload: any) => ({
  type: EDIT_BILL_PAY_BENEFICIARY_FAILURE,
  payload,
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


/**
 * @func editAddModel
 * @param ``
 */
export const editAddModel = (payload: any) => {
  return ({
  type: EDIT_ADD_MODEL,
  payload,
})};



