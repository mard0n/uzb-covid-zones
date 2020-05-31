import { ADD_MASKED_MOBILE } from "../types";

export default (state: any, action: any) => {
  switch (action.type) {
    case ADD_MASKED_MOBILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
