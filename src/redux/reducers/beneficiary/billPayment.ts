import * as AddBillActions from '../../actions/beneficiary/billPayment/addBillPaymentActions';
import * as LandingActions from '../../actions/beneficiary/billPayment/landingActions';

export const initialState: any = {
  loading: false,
  serviceTypes: [],
  myBills: [],
  status: '', //=> 'add' / 'edit' / 'resume' / 'detail'
  // errorCode : ''
};

/**
 * @func Reducer RechargeBillPayments
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    /* Add Beneficiary List - Service Type */
    case AddBillActions.FETCH_BENEFICIARY_SERVICE_TYPES:
      return {
        ...state,
        loading: true,
      };
    case AddBillActions.FETCH_BENEFICIARY_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypes: action.payload,
      };
    case AddBillActions.FETCH_BENEFICIARY_SERVICE_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };
    /* Landing - List Beneficiary - Service Type */
    case LandingActions.FETCH_BILL_PAYMENT_BENEFICIARIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LandingActions.FETCH_BILL_PAYMENT_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        myBills: action.payload,
      };
    case LandingActions.FETCH_BILL_PAYMENT_BENEFICIARIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };
      case AddBillActions.UPDATE_BENEFICIARY_STATUS:
        return {
          ...state,
          status: action.payload,
        };
    default:
      return state;
  }
}
