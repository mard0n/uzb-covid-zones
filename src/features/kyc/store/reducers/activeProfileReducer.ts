import { SET_ACTIVE_PROFILE } from "../../types";

export default (state: any, action: any) => {
  console.log(state,action);
  switch (action.type) {
    case SET_ACTIVE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
