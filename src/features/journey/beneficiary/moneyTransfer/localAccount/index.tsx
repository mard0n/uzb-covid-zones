import React, { useState, useReducer } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import ContextDevTool from "react-context-devtool";
import { useTranslation } from "react-i18next";
import { globalStyle } from "../../../../../util/constants";
import AccountDetails from "./AccountDetails";
import JourneySidebar from "../../../../../components/JourneySidebar";
import * as RoutePath from "../../../../../router/config";
import BankDetails from "./BankDetails";
import BeneficiaryDetails from "./BeneficiaryDetails";
import Authentication from "./Authentication";
import Success from "./Success";
import {
  DispatchContext,
  StateContext,
  combinedReducers,
  combinedState,
} from "./store/context";
import ErrorBoundary from "../.../../../../../../components/errorBoundary";


const routes: any = [
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_ACCOUNTDETAILS,
    component: AccountDetails,
  },
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_BANKDETAILS,
    component: BankDetails,
  },
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_BENEFICIARYDETAILS,
    component: BeneficiaryDetails,
  },
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_AUTHENTICATION,
    component: Authentication,
  },
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_CONFIRMATION,
    component: Success,
  },
];

// const StateContext = React.createContext<any>(null);
// const DispatchContext = React.createContext((() => {}) as any);

const MoneyTransferJourneyLocal = () => {
  const [state, dispatch] = React.useReducer(combinedReducers, combinedState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ContextDevTool
          context={StateContext}
          dispatcher={dispatch}
          id="MTlocalAccount"
          displayName="ADD_MT_LOCALACCOUNT"
        />
        <ErrorBoundary dispatchContext={DispatchContext} errorCode=''>
          <Switch>
            {routes.map((route: any, i: number) => {
              return (
                <Route exact key={i} path={route.path}>
                  <route.component />
                </Route>
              );
            })}
            <Redirect
              exact
              from="*"
              to={
                RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_ACCOUNTDETAILS
              }
            />
          </Switch>
        </ErrorBoundary>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default MoneyTransferJourneyLocal;
