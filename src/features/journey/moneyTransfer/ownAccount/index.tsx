import React , {useState, useReducer} from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import * as RoutePath from "../../../../router/config";
import { Box, makeStyles } from "@mashreq-digital/ui";
import { globalStyle } from "../../../../util/constants";
import StartPayments from "./startYourPayments";
import SetTransferAmount from "./setTransferAmount";
import Review from "./Review";
import Success from "./Success";
import JourneySidebar from "../../../../components/JourneySidebar/index";
import { MONEY_TRANSFER_WITHIN_MASHREQ_STEPS } from "../../../../util/constants";
import transfer from "../../../../redux/reducers/moneyTransfer/transfer";
import { DispatchContext, StateContext } from "../../../../redux/context";

const { postLogin, sidebarWidth, defaultGutter } = globalStyle;
const routes: any = [
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_START,
    component: StartPayments,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_AMOUNT,
    component: SetTransferAmount,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_REVIEW,
    component: Review,
  },
  {
    path: RoutePath.MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_SUCCES,
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

const MoneyTransferJourneyOwnAccount = () => {
  console.log(
    " routerSwitch ===> MoneyTransferJourneyOwnAccount"
  );
  const { mainLayout } = useStyles();
  const location = useLocation();
  const state = location.state;
  let serviceType = (state as any)?.serviceType;
  const [step, setStep] = useState(0);
  const [transferState, transferDispatch] = useReducer(transfer, {
    transfer: {},
  });


  return (
    <Box display="flex" height={postLogin.height} mt={`${postLogin.top}px`}>
    <DispatchContext.Provider value={transferDispatch}>
    <StateContext.Provider value={transferState}>

    <JourneySidebar
        steps={MONEY_TRANSFER_WITHIN_MASHREQ_STEPS}
        currentStep={step}
      />
      <Box className={mainLayout}>
        {routes.map((route: any, i: number) => {
          return (
            <Route exact key={i} path={route.path}>
              <route.component serviceType={serviceType} setStep={(st:any)=>setStep(st)} {...state} />
            </Route>
          );
        })}
      </Box>
      </StateContext.Provider>
      </DispatchContext.Provider>
    </Box>
  );
};

export default MoneyTransferJourneyOwnAccount;
