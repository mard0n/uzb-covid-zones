import React from "react";
import { Route } from "react-router-dom";
import * as RoutePath from "../../../router/config";
// import MoneyTransferJourneyLocal from "./local/index";
import MoneyTransferJourneyWithinMashreq from "./withinMashreq/index";
import MoneyTransferJourneyOwnAccount from "./ownAccount/index";
import MoneyTransferJourneyLocal from "./localAccount/index";
import MoneyTransferJourneyInternational from './international/index';

const MoneyTransferJourney = () => {
  console.log("routerSwitch MoneyTransferJourneyLocal ====== ");
  return (
    <>
      <Route path={RoutePath.MONEY_TRANSFER_JOURNEY_LOCAL}>
        <MoneyTransferJourneyLocal />
      </Route>


      <Route path={RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL}>
      <MoneyTransferJourneyInternational />
    </Route>

      <Route path={RoutePath.MONEY_TRANSFER_JOURNEY_WITHIN}>
        <MoneyTransferJourneyWithinMashreq />
      </Route>

      <Route path={RoutePath.MONEY_TRANSFER_JOURNEY_OWN_ACOUNT}>
        <MoneyTransferJourneyOwnAccount />
      </Route>
    </>
  );
};

export default MoneyTransferJourney;
