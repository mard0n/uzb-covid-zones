/**
 * Actions Types
 */
export const FETCH_MONEY_TRANSFER_BENEFICIARIES_REQUEST =
  'FETCH_MONEY_TRANSFER_BENEFICIARIES_REQUEST';
export const FETCH_MONEY_TRANSFER_BENEFICIARIES_SUCCESS =
  'FETCH_MONEY_TRANSFER_BENEFICIARIES_SUCCESS';
export const FETCH_MONEY_TRANSFER_BENEFICIARIES_FAILURE =
  'FETCH_MONEY_TRANSFER_BENEFICIARIES_FAILURE';
export const SET_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY =
  'SET_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY';
export const CLEAR_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY =
  'CLEAR_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY';
export const REMOVE_MONEY_TRANSFER_BENEFICIARY =
  'REMOVE_MONEY_TRANSFER_BENEFICIARY';
export const CLEAR_MONEY_TRANSFER_BENEFICIARIES_STATE =
  'CLEAR_MONEY_TRANSFER_BENEFICIARIES_STATE';
export const FETCH_MONEY_TRANSFER_BENEFICIARIES_AGAIN =
  'FETCH_MONEY_TRANSFER_BENEFICIARIES_AGAIN';

/**
 * @func fetchMoneyTransferBeneficiariesRequest
 * @param ``
 */
export const fetchMoneyTransferBeneficiariesRequest = (payload?: any) => ({
  type: FETCH_MONEY_TRANSFER_BENEFICIARIES_REQUEST,
  payload
});

export const removeMoneyTransferBeneficiary = (payload: any) => ({
  type: REMOVE_MONEY_TRANSFER_BENEFICIARY,
  payload,
});

export const fetchMoneyTransferBeneficiariesSuccess = (payload: any) => ({
  type: FETCH_MONEY_TRANSFER_BENEFICIARIES_SUCCESS,
  payload,
});

export const fetchMoneyTransferBeneficiariesFailure = (payload: any) => ({
  type: FETCH_MONEY_TRANSFER_BENEFICIARIES_FAILURE,
  payload,
});

export const setSelectedMoneyTransferBeneficiary = (
  selectedService: string,
) => ({
  type: SET_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY,
  payload: selectedService,
});

export const fetchMoneyTransferBeneficiariesAgain = (data: boolean) => ({
  type: FETCH_MONEY_TRANSFER_BENEFICIARIES_AGAIN,
  payload: data,
});

export const clearSelectedRechargeMoneyTransfersService = () => ({
  type: CLEAR_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY,
});

export const clearMoneyTransferBeneficiariesState = () => ({
  type: CLEAR_MONEY_TRANSFER_BENEFICIARIES_STATE,
});
