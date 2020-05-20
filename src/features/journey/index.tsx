import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as RoutePath from "../../router/config";
import MoneyTransferJourney from "./moneyTransfer/index";
import BillPayments from '../postLogin/billpayment/index';

const Journey = () => {
  console.log("routerSwitch Journey ====== ");

  return (
      <Switch>    
        <Route path={RoutePath.MONEY_TRANSFER_JOURNEY}>
          <MoneyTransferJourney />
        </Route>

        <Route path={RoutePath.BILL_PAYMENT_JOURNEY}>
          <BillPayments />
        </Route>

        <Redirect from="*" to={RoutePath.DASHBOARD} />
      </Switch>
  );
};

export default Journey;

// O(n)

// journey/moneytransfer
// journey/billpayment

// journey/abcd


  // fallowing code for handeling back button press
  // const history  = useHistory();
  // useEffect(() => {
  //   return () => {
  //       if (history.action === "POP") // && history.location.pathname === "any specific path") {
  //           history.replace(RoutePath.ROOT, /* the new state */);
  //       }
  //   },[history]);