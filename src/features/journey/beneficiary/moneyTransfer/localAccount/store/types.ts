export const UPDATE_BANK_DETAILS = "UPDATE_BANK_DETAILS";
export const UPDATE_ERROR_CODE = "UPDATE_ERROR_CODE";
export const UPDATE_BENEFICIARY_DETAILS = "UPDATE_BENEFICIARY_DETAILS";
export const CLEAR_STATE = "CLEAR_STATE";

export type LocalAccountState = {
  bankDetails: Object | any,
  beneficiaryDetails: Object | any,
  errorCode: string
}