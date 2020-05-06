import * as Actions from '../../actions/moneyTransfer/fetchBeni';

export const initialState: any = {
  selectedService: null,
  loading: false,
  fetchBeneficiaries: false,
  beneficiaries: null,
  error: null,
};

/**
 * @func Reducer Bill Payment Beneficiaries
 * @param state
 * @param action
 */
export default function(state = initialState, action: any) {
  switch (action.type) {
    /* CRUD */
    case Actions.FETCH_MONEY_TRANSFER_BENEFICIARIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_MONEY_TRANSFER_BENEFICIARIES_AGAIN:
      const fetchBeneficiaris: boolean = action.payload;
      let newState = null;
      if (fetchBeneficiaris) {
        newState = {...initialState, fetchBeneficiaries: action.payload};
      } else {
        newState = {...state, fetchBeneficiaries: action.payload};
      }
      return {
        ...newState,
      };
    case Actions.FETCH_MONEY_TRANSFER_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        beneficiaries: action.payload,
      };
    case Actions.REMOVE_MONEY_TRANSFER_BENEFICIARY:
      const {beneficiaries} = state;
      const newBeneficiaries = beneficiaries;
      let latestBeneficiaries = [];
      if (newBeneficiaries && newBeneficiaries.length > 0) {
        const {sectionLabel, selectedIndex} = action.payload;
        latestBeneficiaries = newBeneficiaries
          .map((item:any) => {
            if (item.sectionLabel === sectionLabel) {
              const newData = item.data.filter(
                (dataItem:any, index:any) => index != selectedIndex,
              );
              item.data = newData;
              // console.log('selected newData', newData);
            }
            return item;
          })
          .filter((item:any) => item.data && item.data.length > 0);
      }
      console.log('latestBeneficiaries', latestBeneficiaries);

      return {
        ...state,
        beneficiaries: latestBeneficiaries,
      };
    case Actions.FETCH_MONEY_TRANSFER_BENEFICIARIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.SET_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY:
      return {
        ...state,
        loading: false,
        selectedService: action.payload,
      };
    case Actions.CLEAR_SELECTED_RECHARGE_MONEY_TRANSFERS_BENEFICIARY:
      return {
        ...state,
        loading: false,
        selectedService: null,
      };
    case Actions.CLEAR_MONEY_TRANSFER_BENEFICIARIES_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
