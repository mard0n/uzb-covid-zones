import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ContextDevTool from "react-context-devtool";
import * as RoutePath from "../../../../../router/config";
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
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN_BENEFICIARYDETAILS,
    component: BeneficiaryDetails,
  },
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN_AUTHENTICATION,
    component: Authentication,
  },
  {
    path: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN_CONFIRMATION,
    component: Success,
  },
];

// const StateContext = React.createContext<any>(null);
// const DispatchContext = React.createContext((() => {}) as any);

const MoneyTransferJourneyWithin = () => {
  const [state, dispatch] = React.useReducer(combinedReducers, combinedState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ContextDevTool
          context={StateContext}
          dispatcher={dispatch}
          id="MTWithinAccount"
          displayName="ADD_MT_WITHINACCOUNT"
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
                RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN_BENEFICIARYDETAILS
              }
            />
          </Switch>
        </ErrorBoundary>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default MoneyTransferJourneyWithin;
