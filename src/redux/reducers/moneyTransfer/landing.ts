import * as LandingActions from "../../actions/moneyTransfer/landingActions";

export const initialState: any = {
  loading: false,
  serviceTypesFT: [],
  errorCode: "",
  errorMessage: "",
};

/**
 * @func Reducer MoneyTransfer
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    /* Landing - List Money Transfer - Service Type */
    case LandingActions.FETCH_MONEY_TRANSFER_LANDING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LandingActions.FETCH_MONEY_TRANSFER_LANDING_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypesFT: action.payload,
      };
    case LandingActions.FETCH_MONEY_TRANSFER_LANDING_FAILURE:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };

    default:
      return state;
  }
}
