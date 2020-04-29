export const MONEY_TRANSFER_INITIATE_TRANSFER_REQUEST =
  'MONEY_TRANSFER_INITIATE_TRANSFER_REQUEST';
export const MONEY_TRANSFER_INITIATE_TRANSFER_SUCCESS =
  'MONEY_TRANSFER_INITIATE_TRANSFER_SUCCESS';
export const MONEY_TRANSFER_INITIATE_TRANSFER_FAILURE =
  'MONEY_TRANSFER_INITIATE_TRANSFER_FAILURE';
export const MONEY_TRANSFER_INITIATE_TRANSFER_CLEAR =
  'MONEY_TRANSFER_INITIATE_TRANSFER_CLEAR';


  /**
 * @func Initiate Money Transfer
 * @param ``
 */
export const moneyTransferInitiateTransfer = (payload: any) => ({
    type: MONEY_TRANSFER_INITIATE_TRANSFER_REQUEST,
    payload,
  });
  
  export const moneyTransferInitiateTransferSuccess = (payload: any) => ({
    type: MONEY_TRANSFER_INITIATE_TRANSFER_SUCCESS,
    payload,
  });
  
  export const moneyTransferInitiateTransferFailure = (payload: any) => ({
    type: MONEY_TRANSFER_INITIATE_TRANSFER_FAILURE,
    payload,
  });
  
  export const moneyTransferInitiateTransferClear = () => {
    return {
      type: MONEY_TRANSFER_INITIATE_TRANSFER_CLEAR,
      payload: {},
    };
  };