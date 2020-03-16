import * as AddBillActions from '../../actions/beneficiary/billPayment/addBillPaymentActions';
import * as LandingActions from '../../actions/beneficiary/billPayment/landingActions';
import * as DeleteActions from '../../actions/beneficiary/billPayment/deleteBillPaymentActions';
import * as ManageActions from '../../actions/beneficiary/billPayment/manageBeneficiaryActions';

export const initialState: any = {
  loading: false,
  serviceTypes: [],
  myBills: [],
  addNew: {},
  errorCode : ''
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
      /* Delete - Delete Beneficiarye */
      case DeleteActions.DELETE_BILL_PAYMENT_BENEFICIARIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DeleteActions.DELETE_BILL_PAYMENT_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };
    case DeleteActions.DELETE_BILL_PAYMENT_BENEFICIARIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };

     /* CRUD */
      case ManageActions.ADD_UPDATE_BILL_PAY_BENEFICIARY_REQUEST:
        return {
          ...state,
          loading: true,
          // response: action.payload,
        };
      case ManageActions.ADD_UPDATE_BILL_PAY_BENEFICIARY_SUCCESS:
        return {
          ...state,
          loading: false,
          addNew: action.payload,
        };
      case ManageActions.ADD_UPDATE_BILL_PAY_BENEFICIARY_FAILURE:
        return {
          ...state,
          loading: false,
          errorCode: action.payload,
        };
      case ManageActions.CLEAR_BILL_PAY_BENEFICIARY_ERRORCODE:
        return {
          ...state,
          errorCode: '',
        };
      case ManageActions.CLEAR_BILL_PAY_BENEFICIARY_ADD_NEW:
        return {
          ...state,
          addNew: {},
        };
      /* Active */
      case ManageActions.ACTIVATE_BENEFICIARY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ManageActions.ACTIVATE_BENEFICIARY_SUCCESS:
        return {
          ...state,
          loading: false,
          // response: action.payload,
        };
      case ManageActions.ACTIVATE_BENEFICIARY_FAILURE:
        return {
          ...state,
          loading: false,
          // response: action.payload,
        };
    default:
      return state;
  }
}
