import * as TransferAction from "../../actions/moneyTransfer/transferAction";

export const initialState: any = {
  transfer: {},
};

/**
 * @func Reducer MoneyTransfer ttansfer object
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    case TransferAction.SET_TRANSFER_OBJECT:
      return {
        ...state,
        transfer: action.payload,
      };
    default:
      return state;
  }
}
