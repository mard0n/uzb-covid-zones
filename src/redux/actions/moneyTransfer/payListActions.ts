/**
 * Actions Types
 */
export const FETCH_PAY_LIST_REQUEST =
  "FETCH_PAY_LIST_REQUEST";
export const FETCH_PAY_LIST_SUCCESS =
  "FETCH_PAY_LIST_SUCCESS";
export const FETCH_PAY_LIST_FAILURE =
  "FETCH_PAY_LIST_FAILURE";


  export const SET_TRANSFER_OBJECT =
  "SET_TRANSFER_OBJECT";


/**
 * @func fetchPayListRequest
 * @param
 */
export const fetchPayListRequest = () => ({
  type: FETCH_PAY_LIST_REQUEST
});

export const fetchPayListSuccess = (payload: any) => ({
  type: FETCH_PAY_LIST_SUCCESS,
  payload
});

export const fetchPayListFailure = (payload: any) => ({
  type: FETCH_PAY_LIST_FAILURE,
  payload
});


export const setTransferObject = (payload:any) => ({
  type: SET_TRANSFER_OBJECT,
  payload
});