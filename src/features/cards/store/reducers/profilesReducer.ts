import { UPDATE_INITIAL_STATE } from "../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
