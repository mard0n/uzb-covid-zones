export const ROOT = `/`;
export const LOGINPAGE = `/login`;
export const TEST = `/test`;
export const PASSCODE = `/passcode`;
export const MOBILEINFO = `/mobileinfo`;

/* Beneficiary */
export const BENEFICIARY = "/beneficiaries/";
export const MONEYTRANSFER = "/moneytransfer/";
export const JOURNEY = "/journey/";
export const DASHBOARD = "/dashboard/";

export const BENIFICIARY_BILL_PAYMENT = `${BENEFICIARY}/billpayment`;
export const BENIFICIARY_BILL_PAYMENT_LANDING = `${BENEFICIARY}/billpayment/landing`;
export const BENIFICIARY_BILL_PAYMENT_DETAILED = `${BENEFICIARY}/billpayment/detailed/:service/:id`;

/* KYC */
export const KYC = "/kyc"

/* Beneficiary money transfer */
export const BENIFICIARY_MONEY_TRANSFER = `${BENEFICIARY}/moneytransfer`; //default route and landing route
export const BENIFICIARY_MONEY_TRANSFER_JOURNEY = `${BENEFICIARY}/moneytransfer/:service/:step`; // service can be create edit and view



/* Bill Payments */
export const BILL_PAYMENTS = "/billpayment/";


export const CREATE_ACCOUNT = `/account/:stepId`;
export const OTHER_ROUTES = `*`;


