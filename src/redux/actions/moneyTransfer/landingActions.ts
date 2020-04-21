/**
 * Actions Types
 */
export const FETCH_MONEY_TRANSFER_LANDING_REQUEST =
  "FETCH_MONEY_TRANSFER_LANDING_REQUEST";
export const FETCH_MONEY_TRANSFER_LANDING_SUCCESS =
  "FETCH_MONEY_TRANSFER_LANDING_SUCCESS";
export const FETCH_MONEY_TRANSFER_LANDING_FAILURE =
  "FETCH_MONEY_TRANSFER_LANDING_FAILURE";

/**
 * @func fetchMoneyTransferLandingRequest
 * @param
 */
export const fetchMoneyTransferLandingRequest = () => ({
  type: FETCH_MONEY_TRANSFER_LANDING_REQUEST
});

export const fetchMoneyTransferLandingSuccess = (payload: any) => ({
  type: FETCH_MONEY_TRANSFER_LANDING_SUCCESS,
  payload
});

export const fetchMoneyTransferLandingFailure = (payload: any) => ({
  type: FETCH_MONEY_TRANSFER_LANDING_FAILURE,
  payload
});
