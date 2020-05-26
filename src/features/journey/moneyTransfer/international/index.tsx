import React,  { useReducer } from "react";
import {Route, useLocation, Redirect,Switch } from "react-router-dom";
import * as RoutePath from "../../../../router/config";
import StartPayments from "./startYourPayments";
import SetTransferAmount from "./setTransferAmount";
import Review from "./Review";
import Success from "./Success";
import Purpose from "./purpose";
import transfer from "../../../../redux/reducers/moneyTransfer/transfer";
import { DispatchContext, StateContext } from "../../../../redux/context";

const routes: any = [
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL_START,
    component: StartPayments,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL_AMOUNT,
    component: SetTransferAmount,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL_PURPOSE,
    component: Purpose,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL_REVIEW,
    component: Review,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL_SUCCES,
    component: Success,
  },
];


const MoneyTransferJourneyInternational = () => {
  const location = useLocation();
  const state = location.state;
  let serviceType = (state as any)?.serviceType;
  let resumeFileds = (state as any)?.resumeFileds;
  const [transferState, transferDispatch] = useReducer(transfer, {
    transfer: {},
    serviceType:serviceType
  }); 

  return (
      <DispatchContext.Provider value={transferDispatch}>
        <StateContext.Provider value={transferState}>
        <Switch>
            {routes.map((route: any, i: number) => {
              return (
                <Route exact key={i} path={route.path}>
                  <route.component
                    serviceType={serviceType}
                    resumeFileds={resumeFileds}
                    {...state}
                  />
                </Route>
              );
            })}
            <Redirect
            exact
            from="*"
            to={
              RoutePath.MONEY_TRANSFER_JOURNEY_INTERNATIONAL_START
            }/>
          </Switch>       
        </StateContext.Provider>
      </DispatchContext.Provider>
  );
};

export default MoneyTransferJourneyInternational;
