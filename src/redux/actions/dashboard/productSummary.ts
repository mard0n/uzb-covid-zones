export const PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST =
  'PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST';
export const PRODUCT_SUMMARY_ACC_LOAN_DEP_FAILURE =
  'PRODUCT_SUMMARY_ACC_LOAN_DEP_FAILURE';
export const PRODUCT_SUMMARY_ACC_LOAN_DEP_SUCCESS =
  'PRODUCT_SUMMARY_ACC_LOAN_DEP_SUCCESS';

export const PRODUCT_SUMMARY_CARD_REQUEST = 'PRODUCT_SUMMARY_CARD_REQUEST';
export const PRODUCT_SUMMARY_CARD_FAILURE = 'PRODUCT_SUMMARY_CARD_FAILURE';
export const PRODUCT_SUMMARY_CARD_SUCCESS = 'PRODUCT_SUMMARY_CARD_SUCCESS';

export const PRODUCT_SUMMARY_REWARDS_REQUEST = 'PRODUCT_SUMMARY_REWARDS_REQUEST';
export const PRODUCT_SUMMARY_REWARDS_FAILURE = 'PRODUCT_SUMMARY_REWARDS_FAILURE';
export const PRODUCT_SUMMARY_REWARDS_SUCCESS = 'PRODUCT_SUMMARY_REWARDS_SUCCESS';

/**
 * @func requestAccLoanDep
 */
export const requestAccLoanDep = () => ({
  type: PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST,
});

/**
 * @func requestAccLoanDepSuccess
 */
export const requestAccLoanDepSuccess = (payload: any) => ({
  type: PRODUCT_SUMMARY_ACC_LOAN_DEP_SUCCESS,
  payload,
});

/**
 * @func requestAccLoanDepFailure
 */
export const requestAccLoanDepFailure = (payload: any) => ({
  type: PRODUCT_SUMMARY_ACC_LOAN_DEP_FAILURE,
  payload,
});


/**
 * @func requestCards
 */
export const requestCards = () => ({
  type: PRODUCT_SUMMARY_CARD_REQUEST,
});

/**
 * @func requestCards
 */
export const requestCardsSuccess = (payload: any) => ({
  type: PRODUCT_SUMMARY_CARD_SUCCESS,
  payload,
});

/**
 * @func requestCardsFailure
 */
export const requestCardsFailure = (payload: any) => ({
  type: PRODUCT_SUMMARY_CARD_FAILURE,
  payload,
});

/**
 * @func requestCards
 */
export const requestReward = () => ({
  type: PRODUCT_SUMMARY_REWARDS_REQUEST,
});

/**
 * @func requestReward
 */
export const requestRewardSuccess = (payload: any) => ({
  type: PRODUCT_SUMMARY_REWARDS_SUCCESS,
  payload,
});

/**
 * @func requestRewardFailure
 */
export const requestRewardFailure = (payload: any) => ({
  type: PRODUCT_SUMMARY_REWARDS_FAILURE,
  payload,
});