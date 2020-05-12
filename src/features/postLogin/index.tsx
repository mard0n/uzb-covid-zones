import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import BillPayment from "./beneficiaries/billPayment";
import BillPayments from "./billpayment";
import * as RoutePath from "../../router/config";
import { Box, makeStyles, Theme } from "@mashreq-digital/ui";
import SideDrawer from "../../components/sidebar";
import { globalStyle } from "../../util/constants";
import Dashboard from "./dashboard";
import MoneyTransfer from "./moneyTransfer/index";

const { postLogin, sidebarWidth, defaultGutter } = globalStyle;
const routes: any = [
  {
    path: RoutePath.DASHBOARD,
    component: Dashboard,
  },
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT,
    component: BillPayment,
  },
  {
    path: RoutePath.BILL_PAYMENTS,
    component: BillPayments,
  },
  {
    path: RoutePath.MONEY_TRANSFER,
    component: MoneyTransfer,
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  mainLayout: {
    width: `calc( 100vw - ${sidebarWidth}px)`,
    height: "100%",
    overflow: "auto",
    padding: `${theme.spacing(10.6)}px ${defaultGutter}px ${theme.spacing(
      10.6
    )}px ${theme.spacing(8)}px`,
  },
}));

const PostLogin = () => {
  console.log("postlogin ====== ");
  const { mainLayout } = useStyles();

  return (
    <Box display="flex" height={postLogin.height} mt={`${postLogin.top}px`}>
      <SideDrawer />
      <Box className={mainLayout}>
        <Switch>
          {routes.map((route: any, i: number) => {
            return (
              <Route path={route.path}>
                <route.component />
              </Route>
            );
          })}
        </Switch>
      </Box>
    </Box>
  );
};

export default PostLogin;


// dashboard  =====>  /  
// <Redirect from="*" to={RoutePath.DASHBOARD} />
