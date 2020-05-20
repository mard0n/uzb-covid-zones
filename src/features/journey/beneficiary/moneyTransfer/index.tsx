import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as RoutePath from "../../../../router/config";
// import MoneyTransferJourneyLocal from "./local/index";
// import MoneyTransferJourneyWithinMashreq from "./withinMashreq/index";
// import MoneyTransferJourneyOwnAccount from "./ownAccount/index";
import MoneyTransferJourneyLocal from "./localAccount/index";

const MoneyTransferJourney = () => {
  return (
    <>
      <Route path={RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL} component={MoneyTransferJourneyLocal} />
      {/* <Redirect exact from="*" to={RoutePath.DASHBOARD} /> */}
          
      {/* <Route path={RoutePath.MONEY_TRANSFER_JOURNEY_WITHIN}>
        <MoneyTransferJourneyWithinMashreq />
      </Route>

      <Route path={RoutePath.MONEY_TRANSFER_JOURNEY_OWN_ACOUNT}>
        <MoneyTransferJourneyOwnAccount />
      </Route> */}
    </>
  );
};

export default MoneyTransferJourney;
