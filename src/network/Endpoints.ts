/**
 * API ENDPOINTS
 */
export const TEST = "/test";

/* Account Loan List */
export const PRODUCT_SUMMARY_ACC_LOAN_DEP_ENDPOINT = '/mob-dashboard/v1/summary/account-loan-deposit';
export const PRODUCT_SUMMARY_CARD_ENDPOINT = '/mob-dashboard/v1/summary/cards';
export const PRODUCT_SUMMARY_REWARDS_ENDPOINT ='/mob-dashboard/v1/summary/rewards';
export const PRODUCT_INSURANCE_ENDPOINT = '/mob-dashboard/v1/summary/insurance';
export const PRODUCT_MM_ENDPOINT = '/mob-dashboard/v1/summary/mmc';

/* MANAGE BENEFICIARY */
/*Money Transfer*/
export const MONEY_TRANSFER_IBAN = '/beneficiary-core-service/v1/beneficiary/search'; //?category="biller" / "utility"
/* Beneficiary */
// const Beneficiary_bill_payment
export const BENEFICIARY_SERVICE_TYPES_ENDPOINT = '/beneficiary-core-service/v1/beneficiary/service-type?category=biller'; //?category="biller" / "utility"
export const MY_BILL_PAYMENT_BENEFICIARES_ENDPOINT = '/beneficiary-core-service/v1/beneficiary/grouped?size=200'; //?size=20
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
export const PAY_LIST_OWN_ACOUNT = `/mob-common-service/v1/payment-options/${'type'}`
export const MONEY_TRANSFER_CURRENCY_EXCHANGE_ENDPOINT = `/mob-facade/v1/currency/conversion`;
export const MONEY_TRANSFER_INITIATE_TRANSFER_ENDPOINT = `/transfer-core-service/v1/transfer`;
export const MONEY_TRANSFER_BENEFICIARIES_ENDPOINT = `/beneficiary-core-service/v1/beneficiary?serviceType=${'type'}&status=${'activationStatus'}`;
export const MONEY_TRANSFER_BENEFICIARIES_ENDPOINT_Static = `/beneficiary-core-service/v1/beneficiary?serviceType=within-mashreq&status=ACTIVE&size=${'count'}`;


export const MONEY_TRANSFER_PURPOSE_OF_PAYMENT_ENDPOINT = `/mob-common-service/v1/payment-purposes/${'transferType'}?qrType=${'qrTypeParam'}&customerType=${'customerTypeParam'}`;
// transactionType = local, international, quick-remit
// countryISOCode = IN, PK, INSTAREM
// customerType= I for Individual, C for Company, "" for Both