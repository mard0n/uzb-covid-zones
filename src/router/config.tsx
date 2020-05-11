export const ROOT = `/`;
export const LOGINPAGE = `/login`;
export const TEST = `/test`;
export const PASSCODE = `/passcode`;
export const MOBILEINFO = `/mobileinfo`;
export const POSTLOGIN = `/`;


/* Beneficiary */
export const BENEFICIARY = "/beneficiaries/";
export const MONEY_TRANSFER = "/moneytransfer/";


/* Journey flows */
export const JOURNEY = "/journey/";
export const MONEY_TRANSFER_JOURNEY = `${JOURNEY}moneytransfer/`;
export const BILL_PAYMENT_JOURNEY = `${JOURNEY}billpayment/`;

/*moneytransfer local journey*/
export const MONEY_TRANSFER_JOURNEY_LOCAL = `${MONEY_TRANSFER_JOURNEY}local/`;
export const MONEY_TRANSFER_JOURNEY_LOCAL_START = `${MONEY_TRANSFER_JOURNEY_LOCAL}start`;
export const MONEY_TRANSFER_JOURNEY_LOCAL_AMOUNT = `${MONEY_TRANSFER_JOURNEY_LOCAL}amount`;
export const MONEY_TRANSFER_JOURNEY_LOCAL_PURPOSE = `${MONEY_TRANSFER_JOURNEY_LOCAL}purpose`;
export const MONEY_TRANSFER_JOURNEY_LOCAL_REVIEW = `${MONEY_TRANSFER_JOURNEY_LOCAL}review`;
export const MONEY_TRANSFER_JOURNEY_LOCAL_SUCCES = `${MONEY_TRANSFER_JOURNEY_LOCAL}succes`;

/*moneytransfer within journey*/
export const MONEY_TRANSFER_JOURNEY_WITHIN = `${MONEY_TRANSFER_JOURNEY}within/`;
export const MONEY_TRANSFER_JOURNEY_WITHIN_START = `${MONEY_TRANSFER_JOURNEY_WITHIN}start`;
export const MONEY_TRANSFER_JOURNEY_WITHIN_AMOUNT = `${MONEY_TRANSFER_JOURNEY_WITHIN}amount`;
export const MONEY_TRANSFER_JOURNEY_WITHIN_REVIEW = `${MONEY_TRANSFER_JOURNEY_WITHIN}review`;
export const MONEY_TRANSFER_JOURNEY_WITHIN_SUCCES = `${MONEY_TRANSFER_JOURNEY_WITHIN}succes`;

/*moneytransfer within journey*/
export const MONEY_TRANSFER_JOURNEY_OWN_ACOUNT = `${MONEY_TRANSFER_JOURNEY}ownacount/`;
export const MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_START = `${MONEY_TRANSFER_JOURNEY_OWN_ACOUNT}start`;
export const MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_AMOUNT = `${MONEY_TRANSFER_JOURNEY_OWN_ACOUNT}amount`;
export const MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_REVIEW = `${MONEY_TRANSFER_JOURNEY_OWN_ACOUNT}review`;
export const MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_SUCCES = `${MONEY_TRANSFER_JOURNEY_OWN_ACOUNT}succes`;



/*moneytransfer interntional journey*/
export const MONEY_TRANSFER_JOURNEY_INTERNATIONAL = `${MONEY_TRANSFER_JOURNEY}interntional/`;
export const MONEY_TRANSFER_JOURNEY_INTERNATIONAL_START = `${MONEY_TRANSFER_JOURNEY_INTERNATIONAL}start`;
export const MONEY_TRANSFER_JOURNEY_INTERNATIONAL_AMOUNT = `${MONEY_TRANSFER_JOURNEY_INTERNATIONAL}amount`;
export const MONEY_TRANSFER_JOURNEY_INTERNATIONAL_PURPOSE = `${MONEY_TRANSFER_JOURNEY_INTERNATIONAL}purpose`;
export const MONEY_TRANSFER_JOURNEY_INTERNATIONAL_REVIEW = `${MONEY_TRANSFER_JOURNEY_INTERNATIONAL}review`;
export const MONEY_TRANSFER_JOURNEY_INTERNATIONAL_SUCCES = `${MONEY_TRANSFER_JOURNEY_INTERNATIONAL}succes`;




export const DASHBOARD = "/dashboard/";
export const BENIFICIARY_BILL_PAYMENT = `${BENEFICIARY}billpayment`;
export const BENIFICIARY_BILL_PAYMENT_LANDING = `${BENEFICIARY}billpayment/landing`;
export const BENIFICIARY_BILL_PAYMENT_DETAILED = `${BENEFICIARY}/billpayment/detailed/:service/:id`;


/* Beneficiary money transfer */
export const BENIFICIARY_MONEY_TRANSFER = `${BENEFICIARY}/moneytransfer`; //default route and landing route
export const BENIFICIARY_MONEY_TRANSFER_JOURNEY = `${BENEFICIARY}/moneytransfer/:service/:step`; // service can be create edit and view



/* Bill Payments */
export const BILL_PAYMENTS = "/billpayment/";


export const CREATE_ACCOUNT = `/account/:stepId`;
export const OTHER_ROUTES = `*`;


