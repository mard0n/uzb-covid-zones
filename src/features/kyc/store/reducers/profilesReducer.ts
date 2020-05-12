import { UPDATE_INITIAL_STATE, UPDATE_LOGIN_TYPE, TRIGGER_EMPLOYMENT_CHANGE } from "../../types";

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
    default:
      return state;
  }
};
