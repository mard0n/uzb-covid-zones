import * as Actions from "../../actions/currencyConverterActions";

export const initialState: any = {
  loading: false,
  response: null,
  error: null,
};

/**
 * @func Reducer currency converter
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    /* CRUD */
    case Actions.DEBOUNCE_CURRENT_RATE_REQUEST:
      return {
        ...state,
      };
    case Actions.DEBOUNCE_EXECUTING:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_CURRENT_RATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_CURRENT_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };
    case Actions.FETCH_CURRENT_RATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.CLEAR_CURRENT_RATE_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
