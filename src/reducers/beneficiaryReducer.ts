import * as Actions from '../actions/beneficiaryActions';

export const initialState: any = {
  loading: false,
  serviceTypes: [],
  status: '', //=> 'add' / 'edit' / 'resume' / 'detail'
  errorCode : ''
};

/**
 * @func Reducer RechargeBillPayments
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    case Actions.FETCH_BENEFICIARY_SERVICE_TYPES:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_BENEFICIARY_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceTypes: action.payload,
      };
    case Actions.FETCH_BENEFICIARY_SERVICE_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };
      case Actions.UPDATE_BENEFICIARY_STATUS:
        return {
          ...state,
          status: action.payload,
        };
    default:
      return state;
  }
}
