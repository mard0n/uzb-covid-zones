import * as PayListActions from "../../actions/moneyTransfer/payListActions";

export const initialState: any = {
  loading: false,
  payListData: {},
  transfer:{},
  errorCode: "",
  errorMessage: ""
};

/**
 * @func Reducer MoneyTransfer
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    /* Landing - List Money Transfer - Service Type */
    case PayListActions.FETCH_PAY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PayListActions.FETCH_PAY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        payListData: action.payload,
      };
    case PayListActions.FETCH_PAY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };
    case PayListActions.SET_TRANSFER_OBJECT:
        return {
          ...state,
          transfer: action.payload,
        }; 
    default:
      return state;
  }
}
