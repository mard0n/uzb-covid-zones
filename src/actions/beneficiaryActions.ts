/**
 * Actions Types
 */
export const FETCH_BENEFICIARY_SERVICE_TYPES = 'FETCH_BENEFICIARY_SERVICE_TYPES';
export const FETCH_BENEFICIARY_SERVICE_TYPES_SUCCESS = 'FETCH_BENEFICIARY_SERVICE_TYPES_SUCCESS';
export const FETCH_BENEFICIARY_SERVICE_TYPES_FAILURE = 'FETCH_BENEFICIARY_SERVICE_TYPES_FAILURE';
export const UPDATE_BENEFICIARY_STATUS = 'UPDATE_BENEFICIARY_STATUS';

/**
 * @func fetchRechargeBillPaymentsRequest
 * @param ``
 */
export const fetchBeneficiaryServiceType = () => ({
  type: FETCH_BENEFICIARY_SERVICE_TYPES
});

export const fetchBeneficiaryServiceTypeSuccess = (payload: any) => ({
  type: FETCH_BENEFICIARY_SERVICE_TYPES_SUCCESS,
  payload
});

export const fetchBeneficiaryServiceTypeFailure = (payload: any) => ({
  type: FETCH_BENEFICIARY_SERVICE_TYPES_FAILURE,
  payload
});

export const updateBeneficiaryStatus = (payload: any) => ({
  type: UPDATE_BENEFICIARY_STATUS,
  payload
});
