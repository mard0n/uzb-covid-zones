export const PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST =
  'PRODUCT_SUMMARY_ACC_LOAN_DEP_REQUEST';
export const PRODUCT_SUMMARY_ACC_LOAN_DEP_FAILURE =
  'PRODUCT_SUMMARY_ACC_LOAN_DEP_FAILURE';
export const PRODUCT_SUMMARY_ACC_LOAN_DEP_SUCCESS =
  'PRODUCT_SUMMARY_ACC_LOAN_DEP_SUCCESS';

export const PRODUCT_SUMMARY_INSURANCE_REQUEST =
  'PRODUCT_SUMMARY_INSURANCE_REQUEST';
export const PRODUCT_SUMMARY_INSURANCE_FAILURE =
  'PRODUCT_SUMMARY_INSURANCE_FAILURE';
export const PRODUCT_SUMMARY_INSURANCE_SUCCESS =
  'PRODUCT_SUMMARY_INSURANCE_SUCCESS';

export const PRODUCT_SUMMARY_MM_REQUEST = 'PRODUCT_SUMMARY_MM_REQUEST';
export const PRODUCT_SUMMARY_MM_FAILURE = 'PRODUCT_SUMMARY_MM_FAILURE';
export const PRODUCT_SUMMARY_MM_SUCCESS = 'PRODUCT_SUMMARY_MM_SUCCESS';

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
 * @func requestInsurance
 */
export const requestInsurance = () => ({
  type: PRODUCT_SUMMARY_INSURANCE_REQUEST,
});

/**
 * @func requestInsuranceSuccess
 */
export const requestInsuranceSuccess = (payload: any) => ({
  type: PRODUCT_SUMMARY_INSURANCE_SUCCESS,
  payload,
});

/**
 * @func requestInsuranceFailure
 */
export const requestInsuranceFailure = (payload: any) => ({
  type: PRODUCT_SUMMARY_INSURANCE_FAILURE,
  payload,
});

/**
 * @func requestMM
 */
export const requestMM = () => ({
  type: PRODUCT_SUMMARY_MM_REQUEST,
});

/**
 * @func requestMMSuccess
 */
export const requestMMSuccess = (payload: any) => ({
  type: PRODUCT_SUMMARY_MM_SUCCESS,
  payload,
});

/**
 * @func requestMMFailure
 */
export const requestMMFailure = (payload: any) => ({
  type: PRODUCT_SUMMARY_MM_FAILURE,
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