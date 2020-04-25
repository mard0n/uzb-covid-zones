/**
 * Actions Types
 */
export const DEBOUNCE_EXECUTING = 'DEBOUNCE_EXECUTING';
export const DEBOUNCE_CURRENT_RATE_REQUEST = 'DEBOUNCE_CURRENT_RATE_REQUEST';
export const FETCH_CURRENT_RATE_REQUEST = 'FETCH_CURRENT_RATE_REQUEST';
export const FETCH_CURRENT_RATE_SUCCESS = 'FETCH_CURRENT_RATE_SUCCESS';
export const FETCH_CURRENT_RATE_FAILURE = 'FETCH_CURRENT_RATE_FAILURE';
export const CLEAR_CURRENT_RATE_STATE = 'CLEAR_CURRENT_RATE_STATE';

/**
 * @func fetchCurrencyRateRequest
 * @param ``
 */
export const fetchCurrencyRateRequest = (payload: any) => ({
  type: FETCH_CURRENT_RATE_REQUEST,
  payload,
});

export const debounceCurrencyRateRequest = (payload: any) => ({
  type: DEBOUNCE_CURRENT_RATE_REQUEST,
  payload,
});

export const debounceExecuting = () => ({
  type: DEBOUNCE_EXECUTING,
});

export const fetchCurrencyRateSuccess = (payload: any) => ({
  type: FETCH_CURRENT_RATE_SUCCESS,
  payload,
});

export const fetchCurrencyRateFailure = (payload: any) => ({
  type: FETCH_CURRENT_RATE_FAILURE,
  payload,
});

export const clearCurrencyRateState = () => ({
  type: CLEAR_CURRENT_RATE_STATE,
});
