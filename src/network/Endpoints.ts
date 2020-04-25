/**
 * API ENDPOINTS
 */
export const TEST = "/test";

/* Account Loan List */
export const PRODUCT_SUMMARY_ACC_LOAN_DEP_ENDPOINT = '/mob-dashboard/v1/summary/account-loan-deposit';
export const PRODUCT_SUMMARY_CARD_ENDPOINT = '/mob-dashboard/v1/summary/cards';
export const PRODUCT_SUMMARY_REWARDS_ENDPOINT ='/mob-dashboard/v1/summary/rewards';

/* MANAGE BENEFICIARY */
/* Beneficiary */
// const Beneficiary_bill_payment
export const BENEFICIARY_SERVICE_TYPES_ENDPOINT = '/beneficiary-core-service/v1/beneficiary/service-type?category=biller'; //?category="biller" / "utility"
export const MY_BILL_PAYMENT_BENEFICIARES_ENDPOINT = '/beneficiary-core-service/v1/beneficiary/grouped?size=200    '; //?size=20
export const BILL_PAYMENT_DETECTION_ENDPOINT = `/beneficiary-core-service/v1/beneficiary/${'beneficiaryId'}`;
export const DELETE_BENEFICIARY_BY_ID_ENDPOINT = `/beneficiary-core-service/v1/beneficiary/${'beneficiaryId'}`;
export const BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT = `/beneficiary-core-service/v1/beneficiary`;
export const ACTIVATE_BENEFICIARY_BY_ID_ENDPOINT = `/beneficiary-core-service/v1/beneficiary/${'beneficiaryId'}/activate`;

/* BILLPAYMENTS */
export const BILL_PAYMENT_ENQUIRY = `/beneficiary-core-service/v1/beneficiary/service-type/enquiry`;
export const BILL_PAYMENT_SOURCE_ACCOUNTS_ENDPOINT = `/payment-core-service/v1/bills/source`;
export const BILL_PAYMENT_PAY_BILL_ENDPOINT = `/payment-core-service/v1/bills/pay`;

/* Money Transfer */
export const MONEY_TRANSFER_LANDING = `/beneficiary-core-service/v1/beneficiary/category?name=Fund%20Transfer`;
