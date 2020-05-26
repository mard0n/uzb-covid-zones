import { UPDATE_BENEFICIARY_DETAILS, UPDATE_ERROR_CODE, CLEAR_STATE } from "./types";

export default (state: any, action: any) => {
  switch (action.type) {
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
        beneficiaryDetails: {}
      };
    default:
      return state;
  }
};
