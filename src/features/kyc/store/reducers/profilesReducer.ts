import { UPDATE_INITIAL_STATE, UPDATE_LOGIN_TYPE, POST_EMPLOYMENT_CHECK } from "../../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_LOGIN_TYPE:
      return {
        ...state,
        loginUser: action.loginUserType
      };
      case POST_EMPLOYMENT_CHECK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
