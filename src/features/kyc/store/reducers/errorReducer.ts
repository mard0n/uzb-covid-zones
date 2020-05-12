import { RESET_ERROR, ERROR } from "../../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case ERROR:
      return {
        error: action.error,
        errorCode: action.errorCode,
      };
    case RESET_ERROR:
      return {
        error: null,
      };
    default:
      return state;
  }
};
