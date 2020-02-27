import MockAdapter from "axios-mock-adapter";
import { API } from "../network";
import * as Endpoints from "../network/Endpoints";
import { mockTest } from "./mockData/mockTest";

const startMocking = (isMockingRequired: boolean = false) => {
  console.log("asdfasjdfjasdjffd");
  if (isMockingRequired) {
    const mock = new MockAdapter(API, {
      delayResponse: 500
    });

    // const accountDetailsUrl = Endpoints.ACCOUNT_DETAIL_ENDPOINT.replace(
    //   'accountNumber',
    //   '019100125077',
    // );

    mock
      //   .onPost(Endpoints.BANK_DETAILS_ACCUITY_SEARCH_ENDPOINT)
      //   .reply(200, mockIBanAccountDetails)
      .onGet(Endpoints.TEST)
      .reply(200, mockTest)
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
