/**
 * API ENDPOINTS
 */
export const TEST = "/test";

/* Beneficiary */
// const Beneficiary_bill_payment
export const BENEFICIARY_SERVICE_TYPES_ENDPOINT = '/beneficiary-core-service/v1/beneficiary/service-type';
export const MY_BILL_PAYMENT_BENEFICIARES_ENDPOINT = '/beneficiary-core-service/v1/beneficiary/groupBy/category?size=200'; //?size=20
export const BILL_PAYMENT_DETECTION_ENDPOINT = `/beneficiary-core-service/v1/beneficiary/${'beneficiaryId'}`;
export const DELETE_BENEFICIARY_BY_ID_ENDPOINT = `/beneficiary-core-service/v1/beneficiary/${'beneficiaryId'}`;
export const BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT = `/beneficiary-core-service/v1/beneficiary`;
export const ACTIVATE_BENEFICIARY_BY_ID_ENDPOINT = `/beneficiary-core-service/v1/beneficiary/${'beneficiaryId'}/activate`;