
import {combineReducers} from 'redux';
import { getBasicReducer } from '../../../util/reducer';
import * as Actions from '../../actions/dashboard/productSummary';

//TODO: structure TBD
const ProductSummary = combineReducers({
  accountLoanDeposit: getBasicReducer({
    request: Actions.PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST,
    success: Actions.PRODUCT_SUMMARY_ACC_LOAN_DEP_SUCCESS,
    failure: Actions.PRODUCT_SUMMARY_ACC_LOAN_DEP_FAILURE
  }),
  card: getBasicReducer({
    request: Actions.PRODUCT_SUMMARY_CARD_REQUEST,
    success: Actions.PRODUCT_SUMMARY_CARD_SUCCESS,
    failure: Actions.PRODUCT_SUMMARY_CARD_FAILURE
  }),
  rewards: getBasicReducer({
    request: Actions.PRODUCT_SUMMARY_REWARDS_REQUEST,
    success: Actions.PRODUCT_SUMMARY_REWARDS_SUCCESS,
    failure: Actions.PRODUCT_SUMMARY_REWARDS_FAILURE
  })
});

export default ProductSummary