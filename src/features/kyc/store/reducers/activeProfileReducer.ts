import { SET_ACTIVE_PROFILE, UPDATE_ACTIVE_PROFILE } from "../../types";

export default (state: any, action: any) => {
  console.log(state,action);
  console.log('Action triggered', action.type)
  switch (action.type) {
    case SET_ACTIVE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
      case UPDATE_ACTIVE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
