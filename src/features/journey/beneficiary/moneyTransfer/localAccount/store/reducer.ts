import { UPDATE_BANK_DETAILS, UPDATE_BENEFICIARY_DETAILS, UPDATE_ERROR_CODE, CLEAR_STATE } from "./types";

export default (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_BANK_DETAILS:
      return {
        ...state,
        bankDetails: action.payload,
      };
    case UPDATE_BENEFICIARY_DETAILS:
      return {
        ...state,
        beneficiaryDetails: action.payload
      };
    case UPDATE_ERROR_CODE:
      return {
        ...state,
        errorCode: action.payload
      };
    case CLEAR_STATE:
      return {
        ...state,
        bankDetails: {},
        beneficiaryDetails: {}
      };
    default:
      return state;
  }
};
