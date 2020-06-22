import MockAdapter from "axios-mock-adapter";
import { API } from "../network";
import * as Endpoints from "../network/Endpoints";
import { mockServiceTypes } from "./mockData/beneficiary/billPayment/mockServiceTypes";
import { mockMyBillPaymentBeneficiaries } from "./mockData/beneficiary/billPayment/mockMyBillPaymentBeneficiaries";
import { mockPaymentSource } from "./mockData/billPayment/mockPaymentSource";
import { mockPaymentBill } from "./mockData/billPayment/mockPaymentBill";
import { mockPaymentEnquiry } from "./mockData/billPayment/mockPaymentEnquiry";
import { landingMocked } from "./mockData/moneyTransfer/landingMocked";
import { payListOwnAccount } from "./mockData/moneyTransfer/payListOwnAccount";
import { payListBeni } from "./mockData/moneyTransfer/payListBeni";
import {
  mockPinResetAuthSendSuccess,
  mockPinResetAuthSendFail,
} from "./mockData/cards/pinReset/mockPinResetAuthSend";
import {
  mockPinResetAuthResendSuccess,
  mockPinResetAuthResendFail,
} from "./mockData/cards/pinReset/mockPinResetAuthResend";
import {
  mockPinResetAuthValidateSuccess,
  mockPinResetAuthValidateFail,
} from "./mockData/cards/pinReset/mockPinResetAuthValidate";
import { mockPinResetSuccess } from "./mockData/cards/pinReset/mockPinReset";
import { mockExpiryDateValidateSuccess } from "./mockData/cards/cardActivation/mockExpiryDateValidate";
// import { mockMTIbansearch } from './mockData/beneficiary/moneyTransfer/mockIBAN';

const startMocking = (isMockingRequired: boolean = false) => {
  if (isMockingRequired) {
    const mock = new MockAdapter(API, {
      delayResponse: 500,
    });

    // const accountDetailsUrl = Endpoints.ACCOUNT_DETAIL_ENDPOINT.replace(
    //   'accountNumber',
    //   '019100125077',
    // );

    mock
      // .onPost(Endpoints.MONEY_TRANSFER_IBAN)
      // .reply(200, mockMTIbansearch)
      // .onPost(Endpoints.BILL_PAYMENT_PAY_BILL_ENDPOINT)
      // .reply(200, mockPaymentBill)
      // .onPost(Endpoints.BILL_PAYMENT_SOURCE_ACCOUNTS_ENDPOINT)
      // .reply(200, mockPaymentSource)
      // .onPost(Endpoints.BILL_PAYMENT_ENQUIRY)
      // .reply(200, mockPaymentEnquiry)
      // .onGet(Endpoints.BENEFICIARY_SERVICE_TYPES_ENDPOINT)
      // .reply(200, mockServiceTypes)
      // .onGet(Endpoints.MONEY_TRANSFER_LANDING)
      // .reply(200, landingMocked)
      // .onPost(Endpoints.CARDS_PIN_RESET)
      // .reply(200, mockPinResetSuccess)
      .onPost(Endpoints.CARDS_PIN_RESET_AUTH_SEND)
      .reply(200, mockPinResetAuthSendSuccess)
      .onPost(Endpoints.CARDS_PIN_RESET_AUTH_RESEND)
      .reply(200, mockPinResetAuthResendSuccess)
      .onPost(Endpoints.CARDS_PIN_RESET_AUTH_VALIDATE)
      .reply(200, mockPinResetAuthValidateSuccess)
      .onPost(Endpoints.CARDS_EXPIRY_DATE_VALIDATION)
      .reply(200, mockExpiryDateValidateSuccess)
      // .onPost(Endpoints.CARDS_PIN_RESET)
      // .reply(200, mockPinResetSuccess)
      // .onGet("mob-common-service/v1/payment-options/own-account")
      // .reply(200, payListOwnAccount)
      // .onGet(Endpoints.MONEY_TRANSFER_BENEFICIARIES_ENDPOINT_Static)
      // .reply(200, payListBeni)
      // .onGet(Endpoints.MY_BILL_PAYMENT_BENEFICIARES_ENDPOINT)
      // .reply(200, mockMyBillPaymentBeneficiaries)
      //   .onGet(Endpoints.WIDGETS_SUMMARY_OWE_ENDPOINT)
      //   .reply(200, mockIOwe)
      //   .onGet(accountDetailsUrl)
      //   .reply(200, mockAccountDetails)
      /* Comment the belowcode if we don't need mock data */
      .onAny()
      .passThrough();
  }
};
startMocking(true);

export { API };
