import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as RoutePath from "../../../router/config";
// import MoneyTransferJourneyLocal from "./local/index";
import MoneyTransferBeneficiary from "./moneyTransfer";

const BeneficiaryJourney = () => {
  console.log("BeneficiaryLocal ====== ");
  return (
    <>
      <Route path={RoutePath.BENEFICIARY_MONEY_TRANSFER_JOURNEY} component={MoneyTransferBeneficiary} />
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

export default BeneficiaryJourney;
