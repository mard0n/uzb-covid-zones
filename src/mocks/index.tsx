import MockAdapter from "axios-mock-adapter";
import { API } from "../network";
// import * as Endpoints from "../network/Endpoints";
// import { mockServiceTypes } from "./mockData/beneficiary/billPayment/mockServiceTypes";
// import { mockMyBillPaymentBeneficiaries } from "./mockData/beneficiary/billPayment/mockMyBillPaymentBeneficiaries";
// import { mockPaymentSource } from "./mockData/billPayment/mockPaymentSource";
// import { mockPaymentEnquiry } from "./mockData/billPayment/mockPaymentEnquiry";

const startMocking = (isMockingRequired: boolean = false) => {
  if (isMockingRequired) {
    const mock = new MockAdapter(API, {
      delayResponse: 500
    });

    // const accountDetailsUrl = Endpoints.ACCOUNT_DETAIL_ENDPOINT.replace(
    //   'accountNumber',
    //   '019100125077',
    // );

    mock
      //   .onPost(Endpoints.BILL_PAYMENT_SOURCE_ACCOUNTS_ENDPOINT)
      //   .reply(200, mockPaymentSource)
      //   .onPost(Endpoints.BILL_PAYMENT_ENQUIRY)
      //   .reply(200, mockPaymentEnquiry)
      // .onGet(Endpoints.BENEFICIARY_SERVICE_TYPES_ENDPOINT)
      // .reply(200, mockServiceTypes)
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
