import React, { useState, useReducer } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import * as RoutePath from "../../../../router/config";
import { Box, makeStyles } from "@mashreq-digital/ui";
import { globalStyle } from "../../../../util/constants";
import StartPayments from "./startYourPayments";
import SetTransferAmount from "./setTransferAmount";
import Review from "./Review";
import Success from "./Success";
import JourneySidebar from "../../../../components/JourneySidebar/index";
import { MONEY_TRANSFER_LOCAL_STEPS } from "../../../../util/constants";
import transfer from "../../../../redux/reducers/moneyTransfer/transfer";
import Purpose from './purpose';
const { postLogin, sidebarWidth, defaultGutter } = globalStyle;
const routes: any = [
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_LOCAL_START,
    component: StartPayments,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_LOCAL_AMOUNT,
    component: SetTransferAmount,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_LOCAL_PURPOSE,
    component: Purpose,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_LOCAL_REVIEW,
    component: Review,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_LOCAL_SUCCES,
    component: Success,
  },
];
const useStyles = makeStyles((theme: any) => ({
  mainLayout: {
    width: `calc( 100vw - ${sidebarWidth}px)`,
    height: "100%",
    overflow: "auto",
    padding: `${theme.spacing(10.6)}px ${defaultGutter}px ${theme.spacing(
      10.6
    )}px ${theme.spacing(8)}px`,
  },
}));

const StateContext = React.createContext<any>(null);
const DispatchContext = React.createContext((() => {}) as any);

const MoneyTransferJourneyLocal = () => {
  console.log(
    " routerSwitch MoneyTransferJourneyLocal -> MoneyTransferJourneyLocal"
  );
  const { mainLayout } = useStyles();
  const location = useLocation();
  const historyState = location.state;
  let serviceType = (historyState as any)?.serviceType;
  let resumeFileds = (historyState as any)?.resumeFileds;
  const [step, setStep] = useState(0);
  const [transferState, transferDispatch] = useReducer(transfer, {
    transfer: {},
  });

  return (
    <Box display="flex" height={postLogin.height} mt={`${postLogin.top}px`}>
      <DispatchContext.Provider value={transferDispatch}>
        <StateContext.Provider value={transferState}>
          <JourneySidebar
            steps={MONEY_TRANSFER_LOCAL_STEPS}
            currentStep={step}
          />
          <Box className={mainLayout}>
            {routes.map((route: any, i: number) => {
              return (
                <Route exact key={i} path={route.path}>
                  <route.component
                    serviceType={serviceType}
                    setStep={(st: any) => setStep(st)}
                    resumeFileds={resumeFileds}
                    {...historyState}
                  />
                </Route>
              );
            })}
          </Box>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Box>
  );
};

export default MoneyTransferJourneyLocal;
