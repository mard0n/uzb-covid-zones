import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as RoutePath from "../../../../router/config";
import MoneyTransferJourneyLocal from "./localAccount";
import MoneyTransferJourneyWithin from "./ownAccount";

const MoneyTransferJourney = () => {
  return (
    <>
      <Route path={RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL} component={MoneyTransferJourneyLocal} />
      <Route path={RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN} component={MoneyTransferJourneyWithin} />
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
